import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

// Pasa a minúsculas y saca los acentos.
const normalizar = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function ProductList({ onSelectProduct }) {
  // Los tres estados del ciclo de vida de la petición
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Texto del buscador (input controlado)
  const [busqueda, setBusqueda] = useState("");

  // El [] hace que el fetch se ejecute una sola vez, cuando el componente
  // aparece en pantalla. "/api" lo redirige el proxy de vite.config.js
  // al backend (http://localhost:3001).
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => {
        // fetch no falla solo con un 404 o un 500: hay que revisar res.ok
        if (!res.ok) {
          throw new Error(`El servidor respondió ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("La API no devolvió una lista de productos");
        }
        setProductos(data);
      })
      .catch((err) => {
        console.error("Error al cargar los productos:", err);
        setError(
          "No pudimos cargar los productos. Intentá de nuevo en unos minutos.",
        );
      })
      .finally(() => setCargando(false));
  }, []);

  // Renderizado condicional: carga y error
  if (cargando) {
    return <p className="product-list__estado">Cargando productos...</p>;
  }

  if (error) {
    return (
      <p
        className="product-list__estado product-list__estado--error"
        role="alert"
      >
        {error}
      </p>
    );
  }

  // No hace falta otro estado: la lista filtrada se calcula en cada render
  const texto = normalizar(busqueda.trim());
  const productosFiltrados = productos.filter(
    (producto) =>
      normalizar(producto.nombre).includes(texto) ||
      normalizar(producto.categoria ?? "").includes(texto),
  );

  return (
    <div className="product-list">
      <input
        type="search"
        className="product-list__buscador"
        placeholder="Buscar por nombre o categoría"
        aria-label="Buscar productos"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {productosFiltrados.length === 0 ? (
        <p className="product-list__estado">
          No encontramos productos para “{busqueda}”.
        </p>
      ) : (
        <div className="product-list__grilla">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
