import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { idProducto, rutaImagen } from "../utils/producto";
import "./ProductDetail.css";
import "./ProductForm.css";

function obtenerSpec(producto, etiqueta) {
  if (!Array.isArray(producto.specs)) {
    return undefined;
  }

  const spec = producto.specs.find(
    (item) => item.label?.toLowerCase() === etiqueta.toLowerCase(),
  );

  return spec?.valor;
}

function ProductDetail({ onAgregar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(`/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`El servidor respondió ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducto(data))
      .catch((err) => {
        console.error("Error al cargar el detalle:", err);
        setError("No encontramos el producto que buscás.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <section className="pagina">
        <p>Cargando producto...</p>
      </section>
    );
  }

  if (error || !producto) {
    return (
      <section className="pagina">
        <p className="form-error" role="alert">
          {error ?? "No encontramos el producto que buscás."}
        </p>
        <Link to="/productos" className="volver-catalogo">
          &larr; Volver al catálogo
        </Link>
      </section>
    );
  }

  const handleAgregar = () => {
    onAgregar(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const handleEliminar = async () => {
    const confirmar = window.confirm(
      `¿Eliminar “${producto.nombre}”? Esta acción no se puede deshacer.`,
    );

    if (!confirmar) {
      return;
    }

    try {
      const respuesta = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}`);
      }

      navigate("/productos");
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      setError(
        "No se pudo eliminar. Confirmá que el backend tenga DELETE /api/productos/:id.",
      );
    }
  };

  const imagen = producto.imagenUrl || producto.imagen;
  const medidas = producto.medidas ?? obtenerSpec(producto, "Medidas");
  const materiales = producto.materiales ?? obtenerSpec(producto, "Materiales");
  const precioFormateado =
    typeof producto.precio === "number"
      ? producto.precio.toLocaleString("es-AR")
      : producto.precio;
  const idActual = idProducto(producto);

  return (
    <section className="detalle-producto-section pagina">
      <Link to="/productos" className="volver-catalogo">
        &larr; Volver al catálogo
      </Link>

      <div id="detalle-producto">
        <img
          src={rutaImagen(imagen)}
          alt={producto.nombre}
          className="producto-imagen-grande"
        />

        <div className="producto-info-detalle">
          {producto.categoria ? (
            <p className="producto-categoria">{producto.categoria}</p>
          ) : null}

          <h1>{producto.nombre}</h1>

          {producto.descripcion ? (
            <p className="producto-descripcion">{producto.descripcion}</p>
          ) : null}

          <p className="producto-precio">${precioFormateado}</p>

          {producto.stock != null ? (
            <p>Stock: {producto.stock}</p>
          ) : null}

          {medidas || materiales || producto.specs?.length ? (
            <dl className="producto-specs">
              {medidas ? (
                <>
                  <dt>Medidas</dt>
                  <dd>{medidas}</dd>
                </>
              ) : null}

              {materiales ? (
                <>
                  <dt>Materiales</dt>
                  <dd>{materiales}</dd>
                </>
              ) : null}

              {Array.isArray(producto.specs)
                ? producto.specs
                    .filter((spec) => {
                      const label = spec.label?.toLowerCase();
                      return label !== "medidas" && label !== "materiales";
                    })
                    .map((spec) => (
                      <Fragment key={spec.label}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.valor}</dd>
                      </Fragment>
                    ))
                : null}
            </dl>
          ) : null}

          <div className="producto-botones">
            <button
              type="button"
              className="btn-carrito"
              onClick={handleAgregar}
            >
              Añadir al carrito
            </button>
            {agregado ? (
              <span className="mensaje-agregado" role="status">
                ✓ ¡Añadido al carrito!
              </span>
            ) : null}
          </div>

          <div className="acciones-admin">
            <Link
              to={`/admin/editar-producto/${idActual}`}
              className="btn-secundario"
            >
              Editar
            </Link>
            <button
              type="button"
              className="btn-peligro"
              onClick={handleEliminar}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
