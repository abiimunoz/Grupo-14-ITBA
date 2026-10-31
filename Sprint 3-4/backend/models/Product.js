const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
    imagenUrl: {
      type: String,
      trim: true,
      default: '',
    },
    // Campos opcionales para mantener compatibilidad con el catálogo actual
    categoria: {
      type: String,
      trim: true,
      default: 'General',
    },
    specs: [
      {
        label: { type: String, trim: true },
        valor: { type: String, trim: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual para mantener compatibilidad con componentes que lean 'imagen'
productSchema.virtual('imagen').get(function () {
  return this.imagenUrl;
});

module.exports = mongoose.model('Product', productSchema);
