import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { PRODUCTO_VACIO, idProducto } from "../utils/producto";

function CrearProducto() {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const handleCrear = async (datos) => {
    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}`);
      }

      const creado = await respuesta.json();
      navigate(`/productos/${idProducto(creado)}`);
    } catch (err) {
      console.error("Error al crear el producto:", err);
      setError(
        "No se pudo crear el producto. Confirmá que el backend tenga POST /api/productos.",
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="pagina">
      <Link to="/productos" className="volver-catalogo">
        &larr; Volver al catálogo
      </Link>
      <h1>Alta de producto</h1>
      <p>Completá los datos para crear un mueble nuevo.</p>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <ProductForm
        valorInicial={PRODUCTO_VACIO}
        onSubmit={handleCrear}
        textoBoton="Crear producto"
        enviando={enviando}
      />
    </section>
  );
}

export default CrearProducto;
