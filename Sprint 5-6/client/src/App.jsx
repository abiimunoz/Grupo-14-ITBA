import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Catalogo from "./components/Catalogo";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";
import { idProducto } from "./utils/producto";

function App() {
  const [carrito, setCarrito] = useState([]);

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  const agregarAlCarrito = (producto) => {
    const id = idProducto(producto);

    setCarrito((prev) => {
      const existente = prev.find((item) => idProducto(item) === id);

      if (existente) {
        return prev.map((item) =>
          idProducto(item) === id
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
          <Route path="/productos" element={<Catalogo />} />
          <Route
            path="/productos/:id"
            element={<ProductDetail onAgregar={agregarAlCarrito} />}
          />
          <Route path="/contacto" element={<ContactForm />} />
          <Route path="/admin/crear-producto" element={<CrearProducto />} />
          <Route
            path="/admin/editar-producto/:id"
            element={<EditarProducto />}
          />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
