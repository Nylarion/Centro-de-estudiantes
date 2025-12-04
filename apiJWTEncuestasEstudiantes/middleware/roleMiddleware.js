// middleware/roleMiddleware.js
// Este middleware asume que authMiddleware ya corrió y req.user existe
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de Administrador.' });
  }
};
module.exports = isAdmin;