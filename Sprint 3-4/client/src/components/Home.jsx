import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="pagina home">
      <h1>Muebles que alimentan el alma</h1>
      <p className="home__texto">
        Hermanos Jota es el redescubrimiento de un arte olvidado: crear muebles
        que no solo sirven una función, sino que alimentan el alma. Cada pieza
        cuenta una historia de artesanía que honra el pasado mientras abraza el
        futuro.
      </p>
      <Link to="/productos" className="btn-carrito home__boton">
        Ver catálogo
      </Link>
    </section>
  );
}

export default Home;
