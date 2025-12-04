require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Importar rutas
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/surveys');

// Importar middleware
const authMiddleware = require('./middleware/authMiddleware');

// Inicializar Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para que al momento de ingresar un caracter no valido la API e Insomnia/Postman no falle.
//----------------------------------------------------------------------------------------------------------//
app.use((err, req, res, next) => {

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

    return res.status(400).json({
      message: "El formato del JSON es invalido. Revisa las comillas, llaves y la sintaxis en general"
    });

  }
  next();
});
//----------------------------------------------------------------------------------------------------------//

app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas públicas (sin autenticación)
app.use('/api/auth', authRoutes);

// Rutas protegidas (requieren autenticación JWT)
app.use('/api/surveys', surveyRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Puerto
const PORT = process.env.PORT || 3000;



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});