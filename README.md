# E-commerce Mueblería Hermanos Jota

**Grupo 14 – ITBA**

Sitio de e-commerce que simula la experiencia de compra de una mueblería. El proyecto se compone de un **frontend** estático (HTML/CSS/JS) y un **backend** en Node.js + Express que expone el catálogo de productos como API REST.

## Integrantes

- Abigail Muñoz
- Alejo Barugel
- Amalia Irurueta
- Gonza Vita
- Juan Cruz Sosa Guevara

## Links del proyecto

- **GitHub:** https://github.com/abiimunoz/Grupo-14-ITBA
- **Web (hosteada en Vercel):** https://grupo-14-itba-gamma.vercel.app/

## Funcionalidades

- Página de inicio con productos destacados cargados dinámicamente.
- Catálogo de productos con buscador.
- Vista de detalle de cada producto.
- Formulario de contacto con validación del lado del cliente.
- API REST con listado de productos y consulta por ID.

## Estructura del repositorio

```
Grupo-14-ITBA/
├── Sprint 1-2/                 # Frontend (sitio estático)
│   ├── index.html
│   ├── productos.html
│   ├── producto.html
│   ├── contacto.html
│   ├── css/styles.css
│   ├── js/                     # data.js, index.js, productos.js, producto.js, contacto.js
│   └── assets/img/             # Logo e imágenes de productos
└── Sprint 3-4/
    └── backend/                # Backend (API REST con Express)
        ├── server.js           # Punto de entrada
        ├── routes/productos.js # Endpoints de /api/productos
        ├── data/productos.js   # Catálogo (array de objetos)
        └── middlewares/        # logger, notFound, errorHandler
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`).
- Extensión **Live Server** de VS Code (o cualquier servidor de archivos estáticos) para el frontend.

## Instalación y ejecución

El proyecto tiene dos servidores independientes que se levantan por separado. Se recomienda usar dos terminales.

### 1. Clonar el repositorio

```bash
git clone https://github.com/abiimunoz/Grupo-14-ITBA.git
cd Grupo-14-ITBA
```

### 2. Backend (API – Express)

```bash
cd "Sprint 3-4/backend"
npm install
npm start          # modo normal
# o bien
npm run dev        # modo desarrollo, con recarga automática (nodemon)
```

El servidor queda escuchando en **http://localhost:3001**. El puerto se puede cambiar con la variable de entorno `PORT`:

```bash
PORT=4000 npm start
```

**Endpoints disponibles**

| Método | Ruta                 | Descripción                  | Respuestas                              |
| ------ | -------------------- | ---------------------------- | --------------------------------------- |
| GET    | `/api/productos`     | Lista todos los productos    | `200` con arreglo JSON                  |
| GET    | `/api/productos/:id` | Devuelve un producto por ID  | `200`, `400` (ID inválido), `404`       |

Ejemplos:

```bash
curl http://localhost:3001/api/productos
curl http://localhost:3001/api/productos/1
```

### 3. Frontend (sitio estático)

El frontend no requiere instalación ni build. En otra terminal:

**Opción A – Live Server (VS Code):** abrir la carpeta `Sprint 1-2`, clic derecho sobre `index.html` → *Open with Live Server*. Por defecto queda en http://127.0.0.1:5500.

**Opción B – Sin VS Code:**

```bash
cd "Sprint 1-2"
npx serve .
# o: python3 -m http.server 5500
```

## Arquitectura

```
┌────────────────────────┐        HTTP / JSON        ┌───────────────────────────┐
│  Frontend (estático)   │  ───────────────────────▶ │  Backend (Node + Express) │
│  HTML + CSS + JS       │      GET /api/productos   │  localhost:3001           │
│  Live Server / Vercel  │  ◀─────────────────────── │  Catálogo en memoria      │
└────────────────────────┘                           └───────────────────────────┘
```

### Frontend

- **HTML5 semántico** con cuatro páginas: inicio, catálogo, detalle de producto y contacto.
- **CSS3** con diseño responsivo *mobile-first* usando Flexbox.
- **JavaScript** sin frameworks: manipulación del DOM, manejo de eventos y renderizado de tarjetas a partir de arrays de objetos.
- El catálogo del frontend vive hoy en `js/data.js`, con la misma estructura que devuelve la API.

### Backend

- **Express 5** con **CORS** habilitado para que el frontend, servido desde otro origen, pueda hacer peticiones.
- Estructura en capas simples: `server.js` (configuración y montaje) → `routes/` (endpoints) → `data/` (fuente de datos).
- **Middlewares** propios:
  - `logger`: imprime método y URL de cada petición.
  - `notFound`: responde `404` con JSON para rutas inexistentes.
  - `errorHandler`: manejador centralizado de errores que devuelve `{ error: "..." }`.
- Los datos se guardan en un array de objetos en memoria, que se reinicia al reiniciar el servidor.

## Decisiones tomadas

- **Frontend y backend separados.** Cada uno se ejecuta de forma independiente, lo que permite desarrollar y desplegar el sitio estático (Vercel) sin depender del servidor de la API.
- **Sin frameworks en el frontend.** Se priorizó trabajar con HTML, CSS y JavaScript nativos para afianzar los fundamentos del DOM y los eventos.
- **Mobile-first con Flexbox.** Se diseña primero para pantallas chicas y se amplía para pantallas grandes.
- **Datos en memoria, sin base de datos.** Para el alcance actual (catálogo de solo lectura) un array de objetos alcanza y simplifica el despliegue. Es un punto de extensión natural para incorporar una base de datos más adelante.
- **Especificaciones como lista `specs` (`label` / `valor`).** Cada mueble tiene atributos distintos (medidas, materiales, capacidad, etc.), por lo que un campo fijo por atributo no escalaba.
- **Middlewares separados en archivos.** Logging, 404 y errores quedan aislados del resto, lo que facilita reutilizarlos y mantenerlos.
- **Validación de parámetros en la API.** El ID se valida como entero y se distinguen `400` (pedido mal formado) de `404` (recurso inexistente).
- **Validación del formulario de contacto en el cliente.** Se validan nombre, email (con expresión regular) y mensaje antes de enviar.
- **Puerto configurable por variable de entorno.** `PORT` con valor por defecto `3001`.

## Estado actual y próximos pasos

- El frontend todavía lee los productos desde `js/data.js`; el siguiente paso es reemplazarlo por `fetch("http://localhost:3001/api/productos")`.
- Las imágenes se sirven desde `Sprint 1-2/assets/img/`; la API devuelve solo la ruta relativa de cada una.
- Agregar endpoints de escritura (`POST`, `PUT`, `DELETE`) y persistencia en base de datos.