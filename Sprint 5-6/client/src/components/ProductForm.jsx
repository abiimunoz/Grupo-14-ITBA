import { useEffect, useState } from "react";
import { PRODUCTO_VACIO } from "../utils/producto";
import "./ProductForm.css";

function ProductForm({ valorInicial, onSubmit, textoBoton, enviando }) {
  const [formulario, setFormulario] = useState(valorInicial ?? PRODUCTO_VACIO);

  useEffect(() => {
    if (valorInicial) {
      setFormulario(valorInicial);
    }
  }, [valorInicial]);

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit({
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock) || 0,
      imagenUrl: formulario.imagenUrl.trim(),
      categoria: formulario.categoria.trim(),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="campo-formulario">
        <label htmlFor="nombre">
          Nombre <span className="campo-requerido">*</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="4"
          value={formulario.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="product-form__fila">
        <div className="campo-formulario">
          <label htmlFor="precio">
            Precio <span className="campo-requerido">*</span>
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="1"
            value={formulario.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formulario.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="campo-formulario">
        <label htmlFor="categoria">Categoría</label>
        <input
          id="categoria"
          name="categoria"
          type="text"
          value={formulario.categoria}
          onChange={handleChange}
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="imagenUrl">URL de imagen</label>
        <input
          id="imagenUrl"
          name="imagenUrl"
          type="text"
          placeholder="/assets/img/producto.png"
          value={formulario.imagenUrl}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-carrito" disabled={enviando}>
        {enviando ? "Guardando..." : textoBoton}
      </button>
    </form>
  );
}

export default ProductForm;
