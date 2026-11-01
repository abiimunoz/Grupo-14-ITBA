import { NavLink } from "react-router-dom";

function NavBar({ cantidadCarrito }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/img/logo.svg" alt="Hermanos Jota" />
      </div>

      <nav className="nav" aria-label="Navegación principal">
        <ul>
          <li>
            <NavLink to="/" end>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos">Productos</NavLink>
          </li>
          <li>
            <NavLink to="/contacto">Contacto</NavLink>
          </li>
        </ul>
      </nav>

      <div className="carrito">
        🛒
        <span className="contador-carrito">{cantidadCarrito}</span>
      </div>
    </header>
  );
}

export default NavBar;
