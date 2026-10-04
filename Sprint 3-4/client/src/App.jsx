import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const [carrito, setCarrito] = useState([]);

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  return (
    <div className="app">
      <NavBar cantidadCarrito={cantidadCarrito} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="pagina">
                <h1>Mueblería Hermanos Jota</h1>
                <p>
                  El catálogo y el detalle los conectan tus compañeros. Este
                  botón sirve para probar el carrito y el contador del NavBar.
                </p>
                <button
                  type="button"
                  className="btn-carrito"
                  onClick={() =>
                    agregarAlCarrito({
                      id: 1,
                      nombre: "Producto de prueba",
                    })
                  }
                >
                  Añadir al carrito
                </button>
              </section>
            }
          />
          <Route
            path="/productos"
            element={
              <section className="pagina">
                <h1>Productos</h1>
                <p>Acá va a ir ProductList / ProductCard.</p>
              </section>
            }
          />
          <Route
            path="/contacto"
            element={
              <section className="pagina">
                <h1>Contacto</h1>
                <p>Acá va a ir ContactForm.</p>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
