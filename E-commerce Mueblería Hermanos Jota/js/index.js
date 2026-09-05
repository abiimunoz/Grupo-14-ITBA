const CANTIDAD_DESTACADOS = 4;

const contenedorDestacados = document.getElementById("contenedor-destacados");

const contadorCarrito = document.getElementById("contador-carrito");

let cantidadCarrito = 0;


function obtenerProductosDestacados(listaProductos, cantidad) {
    const categoriasUsadas = [];
    const destacados = [];

    listaProductos.forEach((producto) => {
        if (destacados.length >= cantidad) {
            return;
        }

        if (!categoriasUsadas.includes(producto.categoria)) {
            categoriasUsadas.push(producto.categoria);
            destacados.push(producto);
        }
    });

    listaProductos.forEach((producto) => {
        if (destacados.length >= cantidad) {
            return;
        }

        if (!destacados.includes(producto)) {
            destacados.push(producto);
        }
    });

    return destacados;
}


function mostrarProductosDestacados(listaProductos) {
    contenedorDestacados.innerHTML = "";

    listaProductos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        tarjeta.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="producto-imagen"
            >
            <div class="producto-info">
                <h3>
                    ${producto.nombre}
                </h3>

                <p class="producto-descripcion">
                    ${producto.descripcion}
                </p>

                <p class="producto-precio">
                    $${producto.precio.toLocaleString("es-AR")}
                </p>
                <div class="producto-botones">
                    <a
                        href="producto.html?id=${producto.id}"
                        class="btn-detalle"
                    >
                        Ver detalle
                    </a>
                    <button
                        type="button"
                        class="btn-carrito"
                        data-id="${producto.id}"
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;

        contenedorDestacados.appendChild(tarjeta);
    });

    activarBotonesCarrito();
}


function activarBotonesCarrito() {
    const botonesCarrito = document.querySelectorAll(".btn-carrito");

    botonesCarrito.forEach((boton) => {
        boton.addEventListener("click", () => {
            cantidadCarrito++;
            contadorCarrito.textContent = cantidadCarrito;
        });
    });
}


const productosDestacados = obtenerProductosDestacados(
    productos,
    CANTIDAD_DESTACADOS,
);

mostrarProductosDestacados(productosDestacados);
