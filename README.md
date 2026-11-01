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
Node.js y Express. En los Sprints 5 y 6 se implementó la persistencia en base de datos
con MongoDB Atlas y el CRUD completo para la gestión de productos. La versión estática
inicial se conserva en la carpeta `Sprint 1-2`.

### Funcionalidades
- Página de inicio con la presentación de la marca
- Catálogo de productos cargado desde la API con MongoDB, con estados de carga y error
- Buscador por nombre o categoría
- Vista de detalle de cada producto
- Carrito de compras con contador en la barra de navegación
- Formulario de contacto con mensaje de confirmación
- Panel de administración: Alta, Edición y Baja de productos (CRUD completo)

## Estructura del repositorio
```
Grupo-14-ITBA/
├── Sprint 1-2/        Sitio estático (HTML, CSS y JavaScript)
├── Sprint 3-4/
│   ├── backend/       API REST con Node.js, Express y MongoDB
│   │   ├── data/          Productos iniciales para seed
│   │   ├── middlewares/   Logger, 404 y manejo centralizado de errores
│   │   ├── models/        Modelo Mongoose (Product)
│   │   ├── routes/        Rutas CRUD de productos
│   │   ├── db.js          Conexión a MongoDB
│   │   ├── seed.js        Script de migración/poblamiento inicial
│   │   └── server.js      Servidor Express y configuración CORS
│   └── client/        Aplicación de React (Sprint 3-4)
└── Sprint 5-6/
    └── client/        Aplicación de React con rutas CRUD completas (Sprint 5-6)
```

## Tecnologías utilizadas

### Frontend
- **React** — componentes, props, `useState` y `useEffect`
- **Vite** — servidor de desarrollo y build
- **React Router** — navegación entre Inicio, Productos, Detalle, Crear y Editar
- **CSS3** — diseño responsivo con Flexbox y Grid

### Backend
- **Node.js** y **Express** — servidor y API RESTful
- **MongoDB** y **Mongoose** — base de datos NoSQL y modelado de datos
- **express.Router** — rutas modularizadas por recurso
- **Middlewares propios** — logging de peticiones, rutas no encontradas (404) y manejador centralizado de errores
- **dotenv**, **CORS** y **nodemon**

## Cómo ejecutar el proyecto
Hace falta tener instalado [Node.js](https://nodejs.org/). El backend y el frontend se levantan por separado, cada uno en su terminal.

1. Cloná el repositorio

   ```bash
   git clone https://github.com/abiimunoz/Grupo-14-ITBA.git
   cd Grupo-14-ITBA
   ```

2. Configurá y levantá el backend

   ```bash
   cd "Sprint 3-4/backend"
   npm install
   ```

   Crea un archivo `.env` en `Sprint 3-4/backend/` basándote en `.env.example`:
   ```env
   PORT=3001
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/muebleria?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:5173
   ```
   *(Si usas MongoDB en local con Compass: `MONGO_URI=mongodb://127.0.0.1:27017/muebleria`)*

   Pobla la base de datos con el catálogo inicial de productos:
   ```bash
   npm run seed
   ```

   Inicia el servidor backend en desarrollo:
   ```bash
   npm run dev
   ```
   Queda corriendo en http://localhost:3001

3. En otra terminal, levantá el frontend

   ```bash
   cd "Sprint 5-6/client"
   npm install
   npm run dev
   ```

4. Abrí http://localhost:5173 en el navegador

El frontend redirige las peticiones a `/api` hacia el backend mediante el proxy configurado en `vite.config.js`.

## API RESTful (CRUD Completo)

| Método | Ruta | Status Éxito | Status Error | Descripción |
|---|---|---|---|---|
| **GET** | `/api/productos` | `200 OK` | `500` | Listado completo de productos ordenados por fecha |
| **GET** | `/api/productos/:id` | `200 OK` | `400` / `404` | Obtener un producto por su `_id` de MongoDB |
| **POST** | `/api/productos` | `201 Created` | `400` | Crear un nuevo producto en la base de datos |
| **PUT** | `/api/productos/:id` | `200 OK` | `400` / `404` | Actualizar un producto existente por su `_id` |
| **DELETE** | `/api/productos/:id` | `200 OK` | `400` / `404` | Eliminar un producto por su `_id` |

### Ejemplo de cuerpo JSON para `POST /api/productos` y `PUT /api/productos/:id`:
```json
{
  "nombre": "Mesa Ratona Nogal",
  "descripcion": "Mesa ratona de centro con acabado natural y patas metálicas.",
  "precio": 85000,
  "stock": 15,
  "imagenUrl": "assets/img/Mesa de Centro Araucaria.png",
  "categoria": "Living"
}
```

*Validaciones:* `nombre` y `precio` son obligatorios. `stock` por defecto es `0`. Si el `id` no tiene formato válido de ObjectId de MongoDB, se responde status `400`. Si el producto no existe, se responde status `404`.

## Despliegue en Producción (Render)
- **Servicio:** Web Service en [Render](https://render.com)
- **Root Directory:** `Sprint 3-4/backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Variables de entorno:** `MONGO_URI`, `NODE_ENV=production`, `PORT=10000`, `CLIENT_URL=https://<tu-frontend>.vercel.app`

## Sprints 1 y 2
La primera versión del sitio está en la carpeta `Sprint 1-2`. Para verla, abrí `Sprint 1-2/index.html` con Live Server (o cualquier servidor local).

## Links del Proyecto
- **GitHub:** https://github.com/abiimunoz/Grupo-14-ITBA
- **Web (host en Vercel, Sprints 1 y 2):** https://grupo-14-itba-gamma.vercel.app/
