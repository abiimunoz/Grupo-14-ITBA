# Guía Rápida: Base de Datos, Conexión y Migración (Backend)

Esta guía explica en pasos sencillos cómo configurar la base de datos MongoDB, conectar el backend y migrar los productos iniciales si acabas de clonar el proyecto.

---

## Requisitos Previos

1. Tener instalado [Node.js](https://nodejs.org/).
2. Estar ubicado en la carpeta del backend:
   ```bash
   cd "Sprint 3-4/backend"
   ```
3. Instalar las dependencias (si aún no lo hiciste):
   ```bash
   npm install
   ```

---

## Paso 1: Elegir cómo correr MongoDB

Puedes usar MongoDB **en tu computadora (Local con Compass)** o **en la nube (MongoDB Atlas)**. Elige la opción que prefieras:

### Opción A: Local con MongoDB Compass
1. Asegúrate de tener instalado y corriendo **MongoDB Community Server** en tu PC.
2. Abre **MongoDB Compass** y presiona **Connect** con la URL por defecto (`mongodb://localhost:27017`).
3. Tu cadena de conexión será:
   ```text
   mongodb://127.0.0.1:27017/muebleria
   ```

---

### Opción B: En la nube con MongoDB Atlas
1. Entra a [MongoDB Atlas](https://www.mongodb.com/atlas) y crea un clúster gratuito (**M0 Free**).
2. En **Database Access**, crea un usuario y contraseña (evita caracteres especiales como `@` o `/`).
3. En **Network Access**, agrega la IP `0.0.0.0/0` (Allow Access from Anywhere).
4. Haz clic en **Connect** > **Drivers** y copia tu URI de conexión, agregando `/muebleria` antes del signo `?`:
   ```text
   mongodb+srv://TU_USUARIO:TU_PASSWORD@tu-cluster.mongodb.net/muebleria?retryWrites=true&w=majority
   ```

---

## Paso 2: Crear el archivo `.env`

En la carpeta `Sprint 3-4/backend/`, crea un archivo llamado `.env` (puedes tomar como referencia `.env.example`):

### Si elegiste Local (Opción A):
```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/muebleria
```

### Si elegiste Atlas (Opción B):
```env
PORT=3001
MONGO_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@tu-cluster.mongodb.net/muebleria?retryWrites=true&w=majority
```

---

## Paso 3: Migrar los Productos a la Base de Datos (Seed)

Ejecuta el script de poblamiento inicial en tu terminal:

```bash
npm run seed
```

El script hará lo siguiente de forma automática:
1. Conecta con tu base de datos.
2. Limpia la colección de productos previa (si existía).
3. Inserta los 12 productos del catálogo con sus precios, descripciones, imágenes y stock inicial.
4. Genera sus identificadores únicos (`_id` de MongoDB).

**Salida esperada en consola:**
```text
🔌 Conectado a MongoDB: muebleria
🧹 Colección de productos limpiada.
✅ 12 productos cargados exitosamente.
👋 Conexión cerrada.
```

---

## Paso 4: Iniciar el Backend

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

Verás el mensaje:
```text
✅ Conectado a MongoDB: muebleria
🚀 Servidor corriendo en puerto 3001
```

### Comprobación rápida:
Abre en tu navegador o cliente API (Postman/Thunder Client):
- [`http://localhost:3001/api/productos`](http://localhost:3001/api/productos) → Debe devolver la lista completa en formato JSON desde MongoDB.

