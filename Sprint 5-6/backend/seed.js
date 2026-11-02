require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const productos = require('./data/productos');

async function seed() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ Error: La variable MONGO_URI no está definida en .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`🔌 Conectado a MongoDB: ${mongoose.connection.name}`);

    // Mapeamos los datos estáticos:
    // - Quitamos 'id' numérico para que MongoDB genere su propio '_id' (ObjectId)
    // - Mapeamos 'imagen' a 'imagenUrl'
    // - Asignamos un stock inicial por defecto a cada producto
    const documentos = productos.map(({ id, imagen, ...resto }) => ({
      ...resto,
      imagenUrl: imagen,
      stock: resto.stock ?? 10,
    }));

    await Product.deleteMany({});
    console.log('🧹 Colección de productos limpiada.');

    const creados = await Product.insertMany(documentos);
    console.log(`✅ ${creados.length} productos cargados exitosamente.`);

    await mongoose.disconnect();
    console.log('👋 Conexión cerrada.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Falló el proceso de seed:', error.message);
    process.exit(1);
  }
}

seed();
