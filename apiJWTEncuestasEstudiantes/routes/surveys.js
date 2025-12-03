// routes/surveys.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware');
const Survey = require('../models/Survey');
const redisClient = require('../config/redis');

const CACHE_KEY = 'surveys_list';
const CACHE_TIME = 1800; // 30 minutos en segundos

// 1. OBTENER ENCUESTAS (Público/Estudiantes) - CON REDIS
router.get('/', auth, async (req, res) => {
  try {
    // Paso A: Consultar Redis
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      console.log('⚡ Hit de Caché (Redis)');
      return res.json(JSON.parse(cachedData));
    }

    // Paso B: Si no hay caché, consultar MongoDB
    console.log('🐢 Consulta a Base de Datos (Mongo)');
    const surveys = await Survey.find({ active: true }).sort({ createdAt: -1 });

    // Paso C: Guardar en Redis para la próxima
    // En Redis v4/v5 set acepta opciones como tercer argumento
    await redisClient.set(CACHE_KEY, JSON.stringify(surveys), {
      EX: CACHE_TIME
    });

    res.json(surveys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener encuestas' });
  }
});

// 2. CREAR ENCUESTA (Solo Admin)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { title, description, options, active } = req.body;

    //VALIDACIONES
    //------------------------------------------------------------------------------------------------------------//
    if (!title || title.trim().length < 15) {

      return res.status(400).json({ message: "El titulo es obligatorio y debe tener al menos de 15 caracteres" });

    }

    if (title.trim().length > 150) {

      return res.status(400).json({ message: "El titulo no puede tener mas de 150 caracteres" });

    }

    if (!description || description.trim().length < 5) {

      return res.status(400).json({ message: "La descripcion es obligatoria y debe tener al menos de 5 caracteres" });

    }

    if (description.trim().length > 300) {

      return res.status(400).json({ message: "La descripcion no puede tener mas de 300 caracteres" });

    }

    if (!Array.isArray(options) || options.length < 2) {

      return res.status(400).json({ message: "La encuesta debe tener al menos 2 opciones para votar." });

    }

    if (options.length > 5) {

      return res.status(400).json({ message: "La encuesta no puede tener mas de 5 opciones" });

    }

    for (let opt of options) {

      if (typeof opt !== "string" || opt.trim() === "") {

        return res.status(400).json({ message: `La opción "${opt}" no es válida.` });

      }
    }

    if (typeof active !== "boolean") {

      return res.status(400).json({ message: "Ingrese un estado valido de la encuesta, puede ser 'true' o 'false'" });

    }

    let isActive = active === undefined ? true : Boolean(active);
    //------------------------------------------------------------------------------------------------------------//

    // Convertir array de strings ["Opción A", "Opción B"] a objetos
    const formattedOptions = options.map(opt => ({ text: opt }));

    const newSurvey = new Survey({
      title,
      description,
      options: formattedOptions,
      active: isActive,
      createdBy: req.user.id
    });

    const survey = await newSurvey.save();

    // IMPORTANTE: Invalidar la caché para que aparezca la nueva encuesta
    await redisClient.del(CACHE_KEY);
    console.log('🧹 Caché invalidada por creación de encuesta');

    res.status(201).json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear encuesta' });
  }
});

// 3. ACTUALIZAR ENCUESTA (Solo Admin)
router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { title, description, options, active } = req.body;

    const updateData = {};

    // Validaciones solo si vienen en el body
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

    // Actualizar en BD
    const updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedSurvey) return res.status(404).json({ message: "Encuesta no encontrada." });

    res.json(updatedSurvey);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar encuesta" });
  }
});


// 3. VOTAR EN ENCUESTA (Estudiantes)
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const { optionId } = req.body;
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ message: 'Encuesta no encontrada' });
    // 1. Verificar que sea estudiante
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Solo los estudiantes pueden votar' });
    }
    // 2. [IMPORTANTE] Verificar si ya votó
    if (survey.votedBy.includes(req.user.id)) {
      return res.status(400).json({ message: 'Ya has votado en esta encuesta' });
    }
    // 3. Buscar la opción y sumar voto
    const option = survey.options.id(optionId);
    if (!option) return res.status(400).json({ message: 'Opción no válida' });

    option.votes++;
    // 4. Registrar que este usuario ya votó
    survey.votedBy.push(req.user.id);
    await survey.save();
    // 5. Invalidar caché
    await redisClient.del('surveys_list');
    res.json({ message: 'Voto registrado', survey });
  } catch (err) {

  }
});



module.exports = router;
