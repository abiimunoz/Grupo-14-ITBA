import { Fragment } from "react";

function obtenerSpec(producto, etiqueta) {
  if (!Array.isArray(producto.specs)) {
    return undefined;
  }

  const spec = producto.specs.find(
    (item) => item.label?.toLowerCase() === etiqueta.toLowerCase(),
  );

  return spec?.valor;
}

function ProductDetail({ producto, onAgregar, onVolver }) {
  if (!producto) {
    return null;
  }

  const medidas = producto.medidas ?? obtenerSpec(producto, "Medidas");
  const materiales = producto.materiales ?? obtenerSpec(producto, "Materiales");
  const precioFormateado =
    typeof producto.precio === "number"
      ? producto.precio.toLocaleString("es-AR")
      : producto.precio;

  return (
    <section className="detalle-producto-section pagina">
      <button type="button" className="volver-catalogo" onClick={onVolver}>
        &larr; Volver al catálogo
      </button>

      <div id="detalle-producto">
        <img
          src={producto.imagen}
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
              onClick={() => onAgregar(producto)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
