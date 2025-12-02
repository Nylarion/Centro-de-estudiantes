const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Validar formato de correo UCT
const isValidUCTEmail = (email) => {
  // Regex: Texto + @alu.uct.cl (ignora mayúsculas/minúsculas)
  const regex = /^[a-zA-Z0-9._%+-]+@alu\.uct\.cl$/;
  return regex.test(email);
};

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  // Recibimos email
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor ingrese correo y contraseña' });
  }

  // --- VALIDACIÓN DE DOMINIO ---
  if (!isValidUCTEmail(email)) {
    return res.status(400).json({ 
      message: 'Registro denegado. Solo se permiten correos institucionales (@alu.uct.cl)' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'Estudiante registrado exitosamente' });
  } catch (err) {
    console.error('Error en register:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  // Login con email
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Ingrese correo y contraseña' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            email: user.email, // Devolvemos email
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Error en login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;