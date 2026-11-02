const mongoose = require('mongoose');

async function conectarDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ Error: La variable de entorno MONGO_URI no está configurada en .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`✅ Conectado a MongoDB: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = conectarDB;
