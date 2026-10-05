import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Catalogo from "./components/Catalogo";
import ContactForm from "./components/ContactForm";
import ProductDetail from "./components/ProductDetail";
import Home from "./components/Home";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
          <Route path="/" element={<Home />} />
          <Route
            path="/productos"
            element={
              productoSeleccionado ? (
                <ProductDetail
                  producto={productoSeleccionado}
                  onVolver={() => setProductoSeleccionado(null)}
                  onAgregar={agregarAlCarrito}
                />
              ) : (
                <Catalogo
                  onAddToCart={agregarAlCarrito}
                  onVerDetalle={setProductoSeleccionado}
                />
              )
            }
          />
          <Route
            path="/contacto"
            element={
              <section className="pagina">
                <h1>Contacto</h1>
                <ContactForm />
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
