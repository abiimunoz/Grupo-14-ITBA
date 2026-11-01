require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./db');

// Importo los middlewares
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Importo las rutas
const productosRouter = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS permitiendo orígenes locales y de producción
const origenesPermitidos = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (como herramientas de prueba Postman/curl o server-to-server)
      // y orígenes autorizados o cualquier origen en entorno de desarrollo
      if (!origin || origenesPermitidos.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Acceso no permitido por la política de CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware de logging (imprime método y URL)
app.use(logger);

// Middleware para parsear el cuerpo de peticiones en formato JSON
app.use(express.json());

// Montaje de rutas
app.use('/api/productos', productosRouter);

// Middleware para rutas no encontradas (404)
app.use(notFound);

// Manejador centralizado de errores
app.use(errorHandler);

// Iniciar el servidor luego de conectar a la base de datos
conectarDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
});
