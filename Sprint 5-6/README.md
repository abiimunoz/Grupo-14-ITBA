# Hermanos Jota — Mueblería (Sprint 5 y 6)

Aplicación full stack de e-commerce para la mueblería Hermanos Jota. Permite ver el catálogo y el detalle de cada producto, y crear, editar y eliminar productos. Los datos se guardan en MongoDB.

**Grupo 14 — ITBA Full Stack**

## Enlaces

| | URL |
|---|---|
| 🌐 Frontend (Vercel) | https://grupo14sprint56.vercel.app |
| 🚀 Backend (Render) | https://grupo-14-itba.onrender.com/api/productos |

> El backend está en el plan gratuito de Render: si no recibió pedidos en un rato, el primero puede tardar unos 50 segundos mientras el servidor se reactiva.

## Arquitectura

```
React (Vite) en Vercel  ⇄  API Express en Render  ⇄  MongoDB Atlas
```

- **`client/`**: frontend en React 19 + Vite + React Router DOM.
- **`backend/`**: API REST en Node.js + Express 5 + Mongoose.

En producción, Vercel reenvía las rutas `/api/*` al backend de Render (`client/vercel.json`). En desarrollo hace lo mismo el proxy de `client/vite.config.js`, que apunta a `http://localhost:3001`.

## Funcionalidades

### Frontend (rutas)

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo con buscador por nombre o categoría |
| `/productos/:id` | Detalle del producto (`useParams`), con botones para editar y eliminar |
| `/contacto` | Formulario de contacto |
| `/admin/crear-producto` | Alta de producto |
| `/admin/editar-producto/:id` | Edición de producto |
| `*` | Página no encontrada |

Después de crear, editar o eliminar un producto, la app redirige con `useNavigate`.

### Backend (API)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Devuelve todos los productos |
| GET | `/api/productos/:id` | Devuelve un producto por `_id` |
| POST | `/api/productos` | Crea un producto (responde `201`) |
| PUT | `/api/productos/:id` | Actualiza un producto |
| DELETE | `/api/productos/:id` | Elimina un producto |

**Modelo `Product`:** `nombre` (String, obligatorio), `descripcion` (String), `precio` (Number, obligatorio), `stock` (Number), `imagenUrl` (String), además de `categoria` y `specs`.

## Variables de entorno

Las variables van en un archivo `backend/.env`, que **no se sube al repositorio**. Hay una plantilla en `backend/.env.example`:

```env
PORT=3001
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<base>?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

| Variable | Para qué sirve | Local | Render |
|---|---|---|---|
| `MONGO_URI` | Cadena de conexión a MongoDB Atlas | Obligatoria | Obligatoria |
| `PORT` | Puerto del servidor | `3001` (por defecto) | No hace falta, Render la asigna |
| `CLIENT_URL` | URL del frontend permitida por CORS | Opcional | `https://grupo14sprint56.vercel.app` (sin `/` al final) |
| `NODE_ENV` | Con `production`, CORS solo acepta los orígenes permitidos | No hace falta | `production` |

En Render se cargan en **Environment** dentro del servicio. El frontend no necesita variables de entorno.

> En MongoDB Atlas, en **Network Access**, tiene que estar habilitada la IP `0.0.0.0/0` para que Render se pueda conectar.

## Cómo correrlo en local

Requisitos: [Node.js](https://nodejs.org/) y una base de datos en MongoDB Atlas.

**1. Backend** (en una terminal):

```bash
cd backend
npm install
# crear el archivo .env a partir de .env.example y completar MONGO_URI
npm run seed   # solo la primera vez: carga los productos iniciales
npm run dev    # http://localhost:3001
```

> `npm run seed` **borra** los productos que haya en la base y carga los originales.

**2. Frontend** (en otra terminal):

```bash
cd client
npm install
npm run dev    # http://localhost:5173
```

## Despliegue

- **Backend en Render** (Web Service): Root Directory `Sprint 5-6/backend`, Build Command `npm install`, Start Command `npm start`, y las variables de entorno de la tabla de arriba.
- **Frontend en Vercel**: Root Directory `Sprint 5-6/client`, Framework Preset `Vite`.
