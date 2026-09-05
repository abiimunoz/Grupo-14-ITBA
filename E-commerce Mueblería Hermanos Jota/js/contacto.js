// ==========================================
// CONTACTO.JS — Mueblería Hermanos Jota
// Lógica del formulario de contacto
// ==========================================


// ==========================================
// REFERENCIAS AL DOM
// ==========================================

const formulario        = document.getElementById("formulario-contacto");

const inputNombre       = document.getElementById("nombre");
const inputEmail        = document.getElementById("email");
const inputMensaje      = document.getElementById("mensaje");

const errorNombre       = document.getElementById("error-nombre");
const errorEmail        = document.getElementById("error-email");
const errorMensaje      = document.getElementById("error-mensaje");

const btnEnviar         = document.getElementById("btn-enviar");

const mensajeExito      = document.getElementById("mensaje-exito");
const btnNuevoMensaje   = document.getElementById("btn-nuevo-mensaje");

const contadorCarrito   = document.getElementById("contador-carrito");


// ==========================================
// VALIDACIÓN
// ==========================================

// Valida que el nombre no esté vacío
function validarNombre() {
    const valor = inputNombre.value.trim();
    const esValido = valor.length > 0;

    errorNombre.hidden = esValido;
    inputNombre.setAttribute("aria-invalid", !esValido);

    return esValido;
}


// Valida el formato de un email
function validarEmail() {
    const valor = inputEmail.value.trim();

    // Expresión regular básica de email
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const esValido = formatoEmail.test(valor);

    errorEmail.hidden = esValido;
    inputEmail.setAttribute("aria-invalid", !esValido);

    return esValido;
}


// Valida que el mensaje no esté vacío
function validarMensaje() {
    const valor = inputMensaje.value.trim();
    const esValido = valor.length > 0;

    errorMensaje.hidden = esValido;
    inputMensaje.setAttribute("aria-invalid", !esValido);

    return esValido;
}


// Valida todos los campos y retorna true si el formulario es válido
function validarFormulario() {
    const nombreValido  = validarNombre();
    const emailValido   = validarEmail();
    const mensajeValido = validarMensaje();

    return nombreValido && emailValido && mensajeValido;
}


// ==========================================
// SIMULACIÓN DE ENVÍO ASÍNCRONO
// ==========================================

// Simula el envío del formulario con un retardo
// (equivalente a una petición a un backend real)
function simularEnvio() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}


// ==========================================
// MANEJO DEL ENVÍO
// ==========================================

async function manejarEnvio(evento) {
    evento.preventDefault();

    // Validar antes de continuar
    if (!validarFormulario()) {
        return;
    }

    // Deshabilitar botón mientras se "envía"
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    // Simular petición asíncrona
    await simularEnvio();

    // Ocultar formulario y mostrar mensaje de éxito (manipulación del DOM)
    formulario.hidden       = true;
    mensajeExito.hidden     = false;

    // Limpiar los campos para el próximo mensaje
    formulario.reset();

    // Restaurar botón
    btnEnviar.disabled      = false;
    btnEnviar.textContent   = "Enviar mensaje";
}


// ==========================================
// RESTABLECER FORMULARIO
// ==========================================

function mostrarFormulario() {
    mensajeExito.hidden     = false;
    formulario.hidden       = false;
    mensajeExito.hidden     = true;

    // Remover estados de error previos
    inputNombre.removeAttribute("aria-invalid");
    inputEmail.removeAttribute("aria-invalid");
    inputMensaje.removeAttribute("aria-invalid");

    errorNombre.hidden  = true;
    errorEmail.hidden   = true;
    errorMensaje.hidden = true;
}


// ==========================================
// CARRITO (contador compartido en el header)
// ==========================================

let cantidadCarrito = 0;


// ==========================================
// EVENTOS
// ==========================================

// Envío del formulario
formulario.addEventListener("submit", manejarEnvio);

// Botón para enviar otro mensaje
btnNuevoMensaje.addEventListener("click", mostrarFormulario);

// Validación en tiempo real campo por campo
inputNombre.addEventListener("input",  validarNombre);
inputEmail.addEventListener("input",   validarEmail);
inputMensaje.addEventListener("input", validarMensaje);
