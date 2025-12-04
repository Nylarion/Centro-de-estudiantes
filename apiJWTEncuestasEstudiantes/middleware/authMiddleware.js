const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Obtener el token del encabezado Authorization
  const authHeader = req.header('Authorization');

  // Verificar si no hay token o no tiene el formato 'Bearer <token>'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extraer el token (quitar 'Bearer ')
  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Añadir el usuario del token al objeto de la solicitud
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};