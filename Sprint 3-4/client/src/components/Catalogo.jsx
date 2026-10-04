import { useState } from "react";
import ProductList from "./ProductList";

// Página /productos. Decide con renderizado condicional si se muestra
// la lista o el detalle: si hay un producto seleccionado, va el detalle;
// si no, va la lista.
function Catalogo({ onAddToCart }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  if (productoSeleccionado) {
    // TODO: cuando ProductDetail esté listo, reemplazar todo este bloque por:
    //   <ProductDetail
    //     producto={productoSeleccionado}
    //     onAddToCart={onAddToCart}
    //     onBack={() => setProductoSeleccionado(null)}
    //   />
    return (
      <section className="pagina">
        <h1>{productoSeleccionado.nombre}</h1>
        <p>Acá va a ir ProductDetail.</p>
        <button
          type="button"
          className="btn-carrito"
          onClick={() => onAddToCart(productoSeleccionado)}
        >
          Añadir al carrito
        </button>{" "}
        <button
          type="button"
          className="btn-carrito"
          onClick={() => setProductoSeleccionado(null)}
        >
          Volver al catálogo
        </button>
      </section>
    );
  }

  return (
    <section className="pagina">
      <h1>Productos</h1>
      <ProductList onSelectProduct={setProductoSeleccionado} />
    </section>
  );
}

export default Catalogo;
