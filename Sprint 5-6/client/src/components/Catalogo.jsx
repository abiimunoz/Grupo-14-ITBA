import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

// Página /productos. Decide con renderizado condicional si se muestra
// la lista de productos o el detalle: si hay un producto seleccionado,
// muestra ProductDetail; si no, muestra el catálogo con ProductList.
function Catalogo({ onAddToCart }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  if (productoSeleccionado) {
    return (
      <ProductDetail
        producto={productoSeleccionado}
        onVolver={() => setProductoSeleccionado(null)}
        onAgregar={onAddToCart}
      />
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
