const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware');
const Survey = require('../models/Survey');
const Answer = require('../models/Answer');
const User = require('../models/User');
const redisClient = require('../config/redis');

// Configuración de caché
const CACHE_KEY = 'surveys_list';
const CACHE_TIME = 1800;

/**
 * @swagger
 * tags:
 *   name: Surveys
 *   description: Gestión de encuestas
 */

/**
 * @swagger
 * /api/surveys:
 *   get:
 *     summary: Obtener todas las encuestas activas
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de encuestas
 */
// ===============================================================
// 1. OBTENER ENCUESTAS (Público/Estudiantes) - CON REDIS
// ===============================================================
router.get('/', auth, async (req, res) => {
  try {
    // Consultar Redis
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      console.log('⚡ Hit de Caché (Redis)');
      return res.json(JSON.parse(cachedData));
    }

    console.log('🐢 Consulta a Base de Datos (Mongo)');
    const surveys = await Survey.find({ active: true }).sort({ createdAt: -1 });

    // Guardar en caché
    await redisClient.set(CACHE_KEY, JSON.stringify(surveys), { EX: CACHE_TIME });

    res.json(surveys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener encuestas' });
  }
});


/**
 * @swagger
 * /api/surveys:
 *   post:
 *     summary: Crear una nueva encuesta (Solo Admin)
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [single, multiple]
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: string
 *     responses:
 *       201:
 *         description: Encuesta creada
 */
// ===============================================================
// 2. CREAR ENCUESTA (Solo Admin)
// ===============================================================
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { title, description, questions, active } = req.body;

    // Validación del título
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ message: 'El título debe tener al menos 3 caracteres.' });
    }
    if (title.trim().length > 150) {
      return res.status(400).json({ message: 'El título no puede superar los 150 caracteres.' });
    }

    // Validación de la descripción
    if (!description || description.trim().length < 5) {
      return res.status(400).json({ message: 'La descripción debe tener al menos 5 caracteres.' });
    }
    if (description.trim().length > 300) {
      return res.status(400).json({ message: 'La descripción no puede superar los 300 caracteres.' });
    }

    // Validación de preguntas
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'La encuesta debe incluir al menos una pregunta.' });
    }

    // Validar cada pregunta
    for (const q of questions) {
      if (!q.text || q.text.trim().length < 3) {
        return res.status(400).json({ message: 'Una de las preguntas no tiene un texto válido.' });
      }

      if (!['single', 'multiple'].includes(q.type)) {
        return res.status(400).json({ message: 'El tipo de pregunta debe ser "single" o "multiple".' });
      }

      if (!Array.isArray(q.options) || q.options.length < 2) {
        return res.status(400).json({ message: 'Cada pregunta debe tener al menos dos opciones.' });
      }

      for (const opt of q.options) {
        if (!opt.text || opt.text.trim() === '') {
          return res.status(400).json({ message: 'Una de las opciones tiene texto vacío.' });
        }
      }
    }

    const isActive = active === undefined ? true : Boolean(active);

    const survey = new Survey({
      title,
      description,
      questions,
      active: isActive,
      createdBy: req.user.id
    });

    const savedSurvey = await survey.save();

    await redisClient.del(CACHE_KEY);
    return res.status(201).json(savedSurvey);

  } catch (err) {
    console.error('Error creando encuesta:', err);
    return res.status(500).json({ message: 'Error al crear la encuesta.' });
  }
});


/**
 * @swagger
 * /api/surveys/{id}:
 *   put:
 *     summary: Actualizar una encuesta (Solo Admin)
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la encuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Encuesta actualizada
 *       404:
 *         description: Encuesta no encontrada
 */
// ===============================================================
// 3. ACTUALIZAR ENCUESTA (Solo Admin)
// ===============================================================
router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { title, description, options, active } = req.body;
    const updateData = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length > 150) {
        return res.status(400).json({ message: "El título no es válido." });
      }
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim().length === 0) {
        return res.status(400).json({ message: "La descripción no es válida." });
      }
      updateData.description = description.trim();
    }

    if (options !== undefined) {
      if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: "Debe haber al menos 2 opciones." });
      }

      for (let opt of options) {
        if (typeof opt !== "string" || opt.trim() === "") {
          return res.status(400).json({ message: `La opción "${opt}" no es válida.` });
        }
      }

      updateData.options = options.map(o => ({ text: o.trim() }));
    }

    if (active !== undefined) {
      if (typeof active !== "boolean") {
        return res.status(400).json({ message: "El campo 'active' solo acepta true o false." });
      }
      updateData.active = active;
    }

    const updatedSurvey = await Survey.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedSurvey) {
      return res.status(404).json({ message: "Encuesta no encontrada." });
    }

    res.json(updatedSurvey);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar encuesta" });
  }
});

/**
 * @swagger
 * /api/surveys/{id}:
 *   delete:
 *     summary: Eliminar una encuesta (Solo Admin)
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la encuesta
 *     responses:
 *       200:
 *         description: Encuesta eliminada correctamente
 *       404:
 *         description: Encuesta no encontrada
 */
// ===============================================================
// 4. ELIMINAR ENCUESTA (Solo Admin)
// ===============================================================
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);

    if (!survey) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }

    // Invalidar caché
    await redisClient.del(CACHE_KEY);
    console.log('Caché invalidada por eliminación de encuesta');

    res.json({ message: 'Encuesta eliminada correctamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar encuesta' });
  }
});


/**
 * @swagger
 * /api/surveys/{id}/answer:
 *   post:
 *     summary: Responder una encuesta (Estudiantes)
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la encuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - responses
 *             properties:
 *               responses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedOptions:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Respuestas guardadas correctamente
 *       400:
 *         description: Ya respondiste esta encuesta o datos inválidos
 *       404:
 *         description: Encuesta no encontrada
 */
// ===============================================================
// 5. RESPONDER ENCUESTA COMPLETA (Estudiantes)
// ===============================================================
router.post('/:id/answer', auth, async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { responses } = req.body;

    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Encuesta no encontrada.' });
    }

    const alreadyAnswered = await Answer.findOne({ surveyId, userId: req.user.id });
    if (alreadyAnswered) {
      return res.status(400).json({ message: 'Ya respondiste esta encuesta.' });
    }

    // Validación de respuestas
    for (const r of responses) {
      const question = survey.questions.id(r.questionId);

      if (!question) {
        return res.status(400).json({ message: 'Una de las preguntas no existe en la encuesta.' });
      }

      if (!Array.isArray(r.selectedOptions) || r.selectedOptions.length === 0) {
        return res.status(400).json({ message: 'Debe seleccionar al menos una opción por pregunta.' });
      }

      for (const optId of r.selectedOptions) {
        if (!question.options.id(optId)) {
          return res.status(400).json({ message: 'Una de las opciones seleccionadas no pertenece a la pregunta.' });
        }
      }

      if (question.type === 'single' && r.selectedOptions.length > 1) {
        return res.status(400).json({ message: 'Esta pregunta solo permite una opción.' });
      }
    }

    const newAnswer = new Answer({
      surveyId,
      userId: req.user.id,
      responses
    });

    await newAnswer.save();
    await redisClient.del(CACHE_KEY);

    return res.status(201).json({ message: 'Respuestas guardadas correctamente.' });

  } catch (err) {
    console.error('Error al guardar respuestas:', err);
    res.status(500).json({ message: 'Error al guardar respuestas.' });
  }
});


/**
 * @swagger
 * /api/surveys/{id}/results:
 *   get:
 *     summary: Ver resultados de una encuesta (Solo Admin)
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la encuesta
 *     responses:
 *       200:
 *         description: Resultados detallados de la encuesta
 *       404:
 *         description: Encuesta no encontrada
 */
// ===============================================================
// 6. RESULTADOS TIPO GOOGLE FORMS (Admin)
// ===============================================================
router.get('/:id/results', auth, isAdmin, async (req, res) => {
  try {
    const surveyId = req.params.id;

    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Encuesta no encontrada.' });
    }

    const answers = await Answer.find({ surveyId });

    const totalUsers = await User.countDocuments();
    const totalResponses = answers.length;
    const responseRate = totalUsers === 0
      ? 0
      : Number(((totalResponses / totalUsers) * 100).toFixed(1));

    const results = {
      surveyId: survey._id,
      title: survey.title,
      totalResponses,
      totalUsers,
      responseRate,
      questions: []
    };

    for (const question of survey.questions) {
      const optionCounts = {};
      question.options.forEach(opt => {
        optionCounts[opt._id] = 0;
      });

      for (const ans of answers) {
        const resp = ans.responses.find(r =>
          r.questionId.toString() === question._id.toString()
        );

        if (!resp) continue;

        for (const optId of resp.selectedOptions) {
          if (optionCounts[optId] !== undefined) {
            optionCounts[optId]++;
          }
        }
      }

      const formattedOptions = question.options.map(opt => ({
        optionId: opt._id,
        text: opt.text,
        votes: optionCounts[opt._id],
        percentage: totalResponses === 0
          ? 0
          : Number(((optionCounts[opt._id] / totalResponses) * 100).toFixed(1))
      }));

      results.questions.push({
        questionId: question._id,
        text: question.text,
        type: question.type,
        options: formattedOptions
      });
    }

    return res.json(results);

  } catch (err) {
    console.error('Error obteniendo resultados:', err);
    res.status(500).json({ message: 'Error al obtener resultados.' });
  }
});


// ===============================================================
module.exports = router;