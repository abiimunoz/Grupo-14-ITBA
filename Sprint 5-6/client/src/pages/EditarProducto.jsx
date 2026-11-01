import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { PRODUCTO_VACIO, productoAFormulario } from "../utils/producto";

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valorInicial, setValorInicial] = useState(PRODUCTO_VACIO);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`El servidor respondió ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setValorInicial(productoAFormulario(data)))
      .catch((err) => {
        console.error("Error al cargar el producto:", err);
        setError("No encontramos el producto para editar.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  const handleEditar = async (datos) => {
    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch(`/api/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}`);
      }

      navigate(`/productos/${id}`);
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      setError(
        "No se pudo guardar. Confirmá que el backend tenga PUT /api/productos/:id.",
      );
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <section className="pagina">
        <p>Cargando producto...</p>
      </section>
    );
  }

  return (
    <section className="pagina">
      <Link to={`/productos/${id}`} className="volver-catalogo">
        &larr; Volver al detalle
      </Link>
      <h1>Editar producto</h1>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <ProductForm
        valorInicial={valorInicial}
        onSubmit={handleEditar}
        textoBoton="Guardar cambios"
        enviando={enviando}
      />
    </section>
  );
}

export default EditarProducto;
