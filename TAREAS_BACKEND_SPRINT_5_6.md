# 📋 Planificación y División de Tareas — Backend (Sprint 5 y 6)
> **Proyecto:** E-commerce Mueblería Hermanos Jota  
> **Objetivo:** Persistencia de Datos y CRUD Completo (MongoDB + Express)  
> **Equipo Backend:** 2 Desarrolladores  

---

## 🎯 Resumen de Entregables del Backend

1. **Persistencia en la nube:** Conexión a base de datos MongoDB Atlas mediante Mongoose.
2. **Modelo de datos:** Esquema `Product` con validaciones de tipos y requerimientos.
3. **API RESTful con CRUD Completo:**
   - `GET /api/productos` — Listar todos los productos desde la base de datos.
   - `GET /api/productos/:id` — Obtener un producto por su `_id` de MongoDB.
   - `POST /api/productos` — Crear un nuevo producto (código de respuesta `201`).
   - `PUT /api/productos/:id` — Actualizar un producto existente.
   - `DELETE /api/productos/:id` — Eliminar un producto existente.
4. **Seguridad y Entorno:** Manejo seguro de credenciales con `dotenv` y archivo `.env.example`.
5. **Poblamiento inicial (Seed):** Script para cargar los productos iniciales en la base de datos.
6. **Despliegue (Deploy):** Backend publicado y operativo en **Render**.
7. **Documentación:** Actualización de `README.md` con endpoints, variables de entorno y link de producción.

---

## 👥 Asignación de Tareas por Desarrollador

```
                    ┌──────────────────────────────────────────────┐
                    │            SPRINT 5 & 6: BACKEND             │
                    └──────────────────────┬───────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
       ┌───────────────────┐                               ┌───────────────────┐
       │   DEV BACKEND 1   │                               │   DEV BACKEND 2   │
       │                   │                               │                   │
       │ • Conexión Atlas  │                               │ • POST /productos │
       │ • Modelo Product  │                               │ • PUT /:id        │
       │ • Seed Script     │                               │ • DELETE /:id     │
       │ • GET /productos  │                               │ • Config CORS     │
       │ • GET /:id        │                               │ • Deploy Render   │
       │ • Error Handler   │                               │ • Documentación   │
       └───────────────────┘                               └───────────────────┘
```

---

### 💻 Dev Backend 1: Base de Datos, Modelo y Endpoints de Lectura (Read)

*Foco: Cimientos de la arquitectura de datos, conexión segura a la nube, integridad de esquemas y endpoints de consulta.*

#### 1. Configuración de Entorno y Conexión (`db.js`)
- [x] Configurar `dotenv` en el backend para gestionar variables sensibles.
- [ ] Configurar las credenciales en el archivo `.env` local y cluster en MongoDB Atlas *(Acción requerida por el equipo al configurar sus credenciales locales)*.
- [x] Crear el archivo `.env.example` en la carpeta `backend/` con las variables de plantilla:
  ```env
  PORT=3001
  MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre-bd>?retryWrites=true&w=majority
  ```
- [x] Asegurarse de que `.env` esté listado en `.gitignore` para no subir credenciales al repositorio.
- [x] Implementar/revisar `db.js` con manejo de errores y log descriptivo al conectar con `mongoose.connect()`.

#### 2. Definición del Esquema y Modelo `Product` (`models/Product.js`)
- [x] Implementar el esquema de Mongoose respetando los campos solicitados por la consigna:
  - `nombre`: `String`, requerido (`[true, 'El nombre es obligatorio']`), trim.
  - `descripcion`: `String`, trim.
  - `precio`: `Number`, requerido (`[true, 'El precio es obligatorio']`), mínimo 0.
  - `stock`: `Number`, por defecto `0`, mínimo 0.
  - `imagenUrl`: `String`, trim.
  - Opcional/compatibilidad: `categoria` (`String`), `specs` (`Array`) para conservar consistencia con el diseño de Hermanos Jota.
  - Habilitar `{ timestamps: true }` para registrar fecha de creación y actualización (`createdAt`, `updatedAt`).

#### 3. Script de Poblamiento Inicial (`seed.js`)
- [x] Verificar que `seed.js` mapee correctamente los datos existentes del catálogo (`Sprint 3-4/backend/data/productos.js`) al nuevo esquema de MongoDB (reemplazando `imagen` por `imagenUrl` y dejando que MongoDB genere el `_id`).
- [x] Agregar o verificar el script en `package.json`:
  ```json
  "scripts": {
    "seed": "node seed.js"
  }
  ```
- [ ] Ejecutar el seed (`npm run seed`) una vez configurado el `.env` con la base de datos real.

#### 4. Endpoints de Lectura (`GET`)
- [x] **`GET /api/productos`**:
  - Reemplazar la lectura del array local por `await Product.find()`.
  - Retornar la lista completa con status `200`.
- [x] **`GET /api/productos/:id`**:
  - Validar que el parámetro `id` sea un ObjectId válido de Mongoose (`mongoose.Types.ObjectId.isValid(id)`). Si no es válido, responder con status `400` y mensaje `{ error: "El ID proporcionado no es válido" }`.
  - Buscar el producto con `await Product.findById(id)`.
  - Si no existe, responder con status `404` y mensaje `{ error: "Producto no encontrado" }`.
  - Si existe, responder con status `200` y el objeto del producto.

#### 5. Manejo Centralizado de Errores de Mongoose (`middlewares/errorHandler.js`)
- [x] Adaptar el middleware para reconocer errores comunes de Mongoose:
  - `CastError`: responder con status `400` ("Identificador inválido").
  - `ValidationError`: responder con status `400` con el detalle de los campos faltantes o inválidos.

---

### 💻 Dev Backend 2: Operaciones de Escritura (C-U-D), CORS, Deploy y Documentación

*Foco: Endpoints de modificación/mutación de datos, validación del payload entrante, configuración de despliegue en la nube y especificación de la API.*

#### 1. Endpoint de Creación (`POST`)
- [ ] **`POST /api/productos`**:
  - Extraer del `req.body`: `nombre`, `descripcion`, `precio`, `stock`, `imagenUrl` (y campos opcionales si aplican).
  - Validar que los campos obligatorios (`nombre`, `precio`) estén presentes antes de guardar o delegar en la validación de Mongoose.
  - Guardar el nuevo documento con `await Product.create(req.body)`.
  - Responder con status **`201`** (Created) y el objeto del producto recién creado.
  - Capturar errores de validación y retornar status `400`.

#### 2. Endpoint de Modificación (`PUT`)
- [ ] **`PUT /api/productos/:id`**:
  - Validar que el parámetro `id` sea un ObjectId válido de Mongoose (`mongoose.Types.ObjectId.isValid(id)`).
  - Actualizar el producto mediante:
    ```javascript
    await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Retorna el documento actualizado
      runValidators: true // Aplica las validaciones del esquema en la actualización
    });
    ```
  - Si no se encuentra el producto, retornar status `404` (`{ error: "Producto no encontrado" }`).
  - Si se actualiza exitosamente, responder con status `200` y el producto actualizado.

#### 3. Endpoint de Eliminación (`DELETE`)
- [ ] **`DELETE /api/productos/:id`**:
  - Validar formato de `id` con `mongoose.Types.ObjectId.isValid(id)`.
  - Eliminar el producto con `await Product.findByIdAndDelete(id)`.
  - Si no existe el producto a eliminar, responder con status `404`.
  - Si se elimina con éxito, responder con status `200` y un mensaje de confirmación (`{ mensaje: "Producto eliminado correctamente", id }`).

#### 4. Configuración de CORS y Scripts de Producción
- [ ] En `server.js`, configurar el middleware `cors` para admitir tanto el entorno local (`http://localhost:5173`) como la URL definitiva del frontend en Vercel/Netlify.
- [ ] Asegurarse de que en `package.json` exista el script de inicio estándar:
  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```

#### 5. Despliegue en Render & Pruebas Integradas
- [ ] Crear el Web Service en **Render** vinculado al repositorio de GitHub:
  - **Build Command:** `npm install` (dentro de la carpeta backend).
  - **Start Command:** `npm start` o `node server.js`.
  - **Root Directory:** configurar la ruta del backend (`Sprint 3-4/backend` o la carpeta final del sprint según organice el grupo).
- [ ] Cargar las variables de entorno en el panel de Render:
  - `MONGO_URI`
  - `NODE_ENV=production`
- [ ] Probar todos los endpoints en el backend desplegado usando Postman, Thunder Client o curl (GET all, GET by id, POST, PUT, DELETE).

#### 6. Documentación de la API en `README.md`
- [ ] Documentar en el `README.md`:
  - URL del backend desplegado en Render.
  - Tabla completa de endpoints CRUD con método, ruta, status code y descripción.
  - Ejemplo del cuerpo JSON requerido para `POST /api/productos` y `PUT /api/productos/:id`.
  - Variables de entorno necesarias para ejecutar el backend en local.

---

## 🔄 Matriz de Contrato de la API REST (para coordinar con Frontend)

Ambos desarrolladores deben asegurarse de que las respuestas coincidan con esta estructura:

| Método | Endpoint | Body requerido | Status Éxito | Status Error |
|---|---|---|---|---|
| **GET** | `/api/productos` | Ninguno | `200 OK` (Array de productos) | `500 Internal Error` |
| **GET** | `/api/productos/:id` | Ninguno | `200 OK` (Objeto producto) | `400 Bad Request` / `404 Not Found` |
| **POST** | `/api/productos` | `{ nombre, precio, descripcion?, stock?, imagenUrl? }` | `201 Created` (Producto creado) | `400 Bad Request` |
| **PUT** | `/api/productos/:id` | Campos a actualizar (`nombre`, `precio`, etc.) | `200 OK` (Producto actualizado) | `400 Bad Request` / `404 Not Found` |
| **DELETE** | `/api/productos/:id` | Ninguno | `200 OK` (`{ mensaje, id }`) | `400 Bad Request` / `404 Not Found` |

### Estructura estándar del Producto en MongoDB:
```json
{
  "_id": "664fa7b890123456789abcde",
  "nombre": "Aparador Uspallata",
  "descripcion": "Aparador de seis puertas fabricado en nogal sostenible...",
  "precio": 420000,
  "stock": 10,
  "imagenUrl": "assets/img/Aparador Uspallata.png",
  "createdAt": "2026-10-31T12:00:00.000Z",
  "updatedAt": "2026-10-31T12:00:00.000Z"
}
```

---

## ⏱️ Cronograma Sugerido de Integración

1. **Día 1-2:** Dev 1 configura Atlas y Modelos; Dev 2 prepara la estructura de rutas CRUD y validaciones.
2. **Día 3:** Dev 1 sube endpoints GET y ejecuta el Seed; Dev 2 implementa POST, PUT y DELETE.
3. **Día 4:** Pruebas conjuntas de todo el CRUD con Postman / Thunder Client.
4. **Día 5:** Dev 2 despliega en Render; Dev 1 y Dev 2 validan conexión desde el Frontend en local y en producción.
5. **Día 6:** Cierre de documentación en `README.md` y entrega final.

