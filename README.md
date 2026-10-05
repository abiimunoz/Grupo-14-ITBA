# Grupo-14-ITBA

# E-commerce Mueblería Hermanos Jota

## Integrantes
- Abigail Muñoz
- Alejo Barugel
- Amalia Irurueta
- Gonza Vita
- Juan Cruz Sosa Guevara

## Descripción
Sitio web de e-commerce que simula la experiencia de compra de una mueblería.

En los Sprints 3 y 4 el proyecto pasó a ser una aplicación cliente-servidor:
un frontend en React que pide los productos a una API propia hecha con
Node.js y Express. La versión anterior, hecha solo con HTML, CSS y JavaScript,
se conserva en la carpeta `Sprint 1-2`.

### Funcionalidades
- Página de inicio con la presentación de la marca
- Catálogo de productos cargado desde la API, con estados de carga y de error
- Buscador por nombre o categoría
- Vista de detalle de cada producto
- Carrito de compras con contador en la barra de navegación
- Formulario de contacto con mensaje de confirmación

## Estructura del repositorio
```
Grupo-14-ITBA/
├── Sprint 1-2/        Sitio estático (HTML, CSS y JavaScript)
└── Sprint 3-4/
    ├── backend/       API con Node.js y Express
    │   ├── data/          Productos (array de objetos)
    │   ├── middlewares/   Logger, 404 y manejo de errores
    │   ├── routes/        Rutas de productos
    │   └── server.js
    └── client/        Aplicación de React
        ├── public/        Imágenes de los productos y logo
        └── src/
            ├── components/
            ├── App.jsx
            └── main.jsx
```

## Tecnologías utilizadas

### Frontend
- **React** — componentes, props, `useState` y `useEffect`
- **Vite** — servidor de desarrollo y build (se usó en lugar de create-react-app)
- **React Router** — navegación entre Inicio, Productos y Contacto
- **CSS3** — diseño responsivo con Flexbox y Grid

### Backend
- **Node.js** y **Express** — servidor y API REST
- **express.Router** — rutas organizadas por módulo
- **Middlewares propios** — logging de cada petición, rutas no encontradas (404)
  y manejador de errores centralizado
- **CORS** y **nodemon**

## Cómo ejecutar el proyecto
Hace falta tener instalado [Node.js](https://nodejs.org/). El backend y el
frontend se levantan por separado, cada uno en su terminal.

1. Cloná el repositorio

   ```bash
   git clone https://github.com/abiimunoz/Grupo-14-ITBA.git
   cd Grupo-14-ITBA
   ```

2. Levantá el backend

   ```bash
   cd "Sprint 3-4/backend"
   npm install
   npm run dev
   ```

   Queda corriendo en http://localhost:3001

3. En otra terminal, levantá el frontend

   ```bash
   cd "Sprint 3-4/client"
   npm install
   npm run dev
   ```

4. Abrí http://localhost:5173 en el navegador

El frontend redirige las peticiones a `/api` hacia el backend mediante el proxy
configurado en `vite.config.js`, así que los dos tienen que estar corriendo.

## API

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/productos` | Listado completo de productos en JSON |
| GET | `/api/productos/:id` | Un producto por su id |

`GET /api/productos/:id` responde 404 si el producto no existe y 400 si el id
no es un número entero.

## Sprints 1 y 2
La primera versión del sitio está en la carpeta `Sprint 1-2`. Para verla, abrí
`Sprint 1-2/index.html` con Live Server (o cualquier servidor local).

## Links del Proyecto
- **GitHub:** https://github.com/abiimunoz/Grupo-14-ITBA
- **Web (host en Vercel, Sprints 1 y 2):** https://grupo-14-itba-gamma.vercel.app/
