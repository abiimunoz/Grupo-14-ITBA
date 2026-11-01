import { Link } from "react-router-dom";
import { idProducto, rutaImagen } from "../utils/producto";
import "./ProductCard.css";

function ProductCard({ producto }) {
  const imagen = producto.imagenUrl || producto.imagen;
  const precio =
    typeof producto.precio === "number"
      ? producto.precio.toLocaleString("es-AR")
      : producto.precio;

  return (
    <article className="product-card">
      <img
        className="product-card__imagen"
        src={rutaImagen(imagen)}
        alt={producto.nombre}
        loading="lazy"
      />
      <div className="product-card__cuerpo">
        {producto.categoria ? (
          <p className="product-card__categoria">{producto.categoria}</p>
        ) : null}
        <h2 className="product-card__nombre">{producto.nombre}</h2>
        <p className="product-card__precio">${precio}</p>
        <Link
          to={`/productos/${idProducto(producto)}`}
          className="product-card__boton"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
