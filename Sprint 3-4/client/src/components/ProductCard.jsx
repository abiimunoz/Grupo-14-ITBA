import "./ProductCard.css";

// La API manda la imagen como "assets/img/archivo.png" (sin barra inicial).
// Le agregamos la "/" para que siempre se busque desde la raíz del sitio,
// es decir, dentro de client/public.
const rutaImagen = (imagen) =>
  imagen.startsWith("/") || imagen.startsWith("http") ? imagen : `/${imagen}`;

function ProductCard({ producto, onSelect }) {
  return (
    <article className="product-card">
      <img
        className="product-card__imagen"
        src={rutaImagen(producto.imagen)}
        alt={producto.nombre}
        loading="lazy"
      />
      <div className="product-card__cuerpo">
        <p className="product-card__categoria">{producto.categoria}</p>
        <h2 className="product-card__nombre">{producto.nombre}</h2>
        <p className="product-card__precio">
          ${producto.precio.toLocaleString("es-AR")}
        </p>
        <button
          type="button"
          className="product-card__boton"
          onClick={() => onSelect(producto)}
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
