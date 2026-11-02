// Middleware para registrar en consola el método y la URL de cada petición
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = logger;
