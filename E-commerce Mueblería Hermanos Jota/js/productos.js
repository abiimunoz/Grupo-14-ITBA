
//Funciones de busqueda por ID

const contenedorProductos =
    document.getElementById("contenedor-productos");

const buscador =
    document.getElementById("buscador");

const btnBuscar =
    document.getElementById("btn-buscar");

const mensajeSinResultados =
    document.getElementById("mensaje-sin-resultados");

const contadorCarrito =
    document.getElementById("contador-carrito");




function mostrarProductos(listaProductos) {

    // Limpiamos el contenedor
    contenedorProductos.innerHTML = "";

    // Si no hay productos
    if (listaProductos.length === 0) {

        mensajeSinResultados.hidden = false;

        return;
    }

    mensajeSinResultados.hidden = true;


    // Crear una tarjeta por cada producto

    listaProductos.forEach(producto => {
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


        contenedorProductos.appendChild(tarjeta);

    });


    // Activar botones del carrito
    activarBotonesCarrito();
}



// BUSCADOR


function buscarProductos() {

    const textoBusqueda =
        buscador.value
            .toLowerCase()
            .trim();


    const productosFiltrados =
        productos.filter(producto =>

            producto.nombre
                .toLowerCase()
                .includes(textoBusqueda)

        );


    mostrarProductos(productosFiltrados);
}



// EVENTOS 

//Buscador
btnBuscar.addEventListener(
    "click",
    buscarProductos
);


buscador.addEventListener(
    "input",
    buscarProductos
);


//Carrito

let cantidadCarrito = 0;


function activarBotonesCarrito() {

    const botonesCarrito =
        document.querySelectorAll(".btn-carrito");


    botonesCarrito.forEach(boton => {

        boton.addEventListener("click", () => {

            cantidadCarrito++;

            contadorCarrito.textContent =
                cantidadCarrito;

        });

    });

}


// ==========================================
// CARGAR PRODUCTOS AL INICIAR
// ==========================================

mostrarProductos(productos);
