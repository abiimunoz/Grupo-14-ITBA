import ProductList from "./ProductList";

function Catalogo({ onVerDetalle }) {
  return (
    <section className="pagina">
      <h1>Productos</h1>
      <ProductList onSelectProduct={onVerDetalle} />
    </section>
  );
}

export default Catalogo;
