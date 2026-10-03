const express = require('express');
const cors = require('cors');

// Importo los middlewares
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Importo las rutas
const productosRouter = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3001;

//Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

//Middleware de logging (imprime método y URL)
app.use(logger);

// 3. Middleware para parsear el cuerpo de peticiones en formato JSON
app.use(express.json());

// 4. Montaje de rutas
app.use('/api/productos', productosRouter);

// 5. Middleware para rutas no encontradas (404)
app.use(notFound);

// 6. Manejador centralizado de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
