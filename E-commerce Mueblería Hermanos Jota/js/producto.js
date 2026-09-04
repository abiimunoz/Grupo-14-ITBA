// Funciones de detalle de producto

const detalleProducto = document.getElementById("detalle-producto");

const mensajeProductoNoEncontrado = document.getElementById(
  "mensaje-producto-no-encontrado",
);

const contadorCarrito = document.getElementById("contador-carrito");

// OBTENER ID DESDE LA URL

function obtenerIdDesdeUrl() {
  const parametros = new URLSearchParams(window.location.search);

  return Number(parametros.get("id"));
}

// BUSCAR PRODUCTO POR ID

function buscarProductoPorId(id) {
  let productoEncontrado;

  productos.forEach((producto) => {
    if (producto.id === id) {
      productoEncontrado = producto;
    }
  });

  return productoEncontrado;
}

// MOSTRAR DETALLE

function mostrarDetalleProducto(producto) {
  // Si no existe el producto (id inválido o inexistente)
  if (!producto) {
    detalleProducto.hidden = true;
    mensajeProductoNoEncontrado.hidden = false;

    return;
  }

  document.title = `${producto.nombre} | Mueblería Hermanos Jota`;

  // Detalles de fabricación (specs) como filas de una lista de definición
  let specsHtml = "";
  producto.specs.forEach((spec) => {
    specsHtml += `
                <dt>${spec.label}</dt>
                <dd>${spec.valor}</dd>
            `;
  });

  detalleProducto.innerHTML = `
        <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            class="producto-imagen-grande"
        >

        <div class="producto-info-detalle">

            <p class="producto-categoria">
                ${producto.categoria}
            </p>

            <h1>
                ${producto.nombre}
            </h1>

            <p class="producto-descripcion">
                ${producto.descripcion}
            </p>

            <p class="producto-precio">
                $${producto.precio.toLocaleString("es-AR")}
            </p>

            <dl class="producto-specs">
                ${specsHtml}
            </dl>

            <div class="producto-botones">
                <button
                    type="button"
                    id="btn-agregar-carrito"
                    class="btn-carrito"
                    data-id="${producto.id}"
                >
                    Añadir al Carrito
                </button>

                <p id="mensaje-agregado" class="mensaje-agregado" hidden>
                    Producto agregado al carrito.
                </p>
            </div>

        </div>
    `;

  activarBotonCarrito();
}

// CARRITO

let cantidadCarrito = 0;

function activarBotonCarrito() {
  const botonCarrito = document.getElementById("btn-agregar-carrito");

  const mensajeAgregado = document.getElementById("mensaje-agregado");

  botonCarrito.addEventListener("click", () => {
    cantidadCarrito++;

    contadorCarrito.textContent = cantidadCarrito;

    mensajeAgregado.hidden = false;
  });
}

// ==========================================
// CARGAR PRODUCTO AL INICIAR
// ==========================================

const idProducto = obtenerIdDesdeUrl();
const producto = buscarProductoPorId(idProducto);

mostrarDetalleProducto(producto);
