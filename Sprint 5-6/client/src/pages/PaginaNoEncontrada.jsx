import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
  return (
    <section className="pagina">
      <h1>Página no encontrada</h1>
      <p>La ruta que buscás no existe.</p>
      <Link to="/" className="btn-carrito">
        Volver al inicio
      </Link>
    </section>
  );
}

export default PaginaNoEncontrada;
