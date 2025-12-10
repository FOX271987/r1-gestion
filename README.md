# Mi Inventario 📦

Sistema de Inventario con Login y CRUD de Productos.

## 🚀 Tecnologías

- **Backend:** Node.js + Express
- **Frontend:** EJS + TailwindCSS
- **Base de datos:** PostgreSQL
- **Autenticación:** JWT

## 📋 Requisitos Previos

1. **Node.js** (versión 18 o superior)
   - Descarga: https://nodejs.org/

2. **PostgreSQL** (versión 12 o superior)
   - Descarga: https://www.postgresql.org/download/

## 🛠️ Instalación en Windows

### Paso 1: Configurar PostgreSQL

1. Abre **pgAdmin** o la terminal de PostgreSQL
2. Crea la base de datos:

```sql
CREATE DATABASE mi_inventario_db;
```

### Paso 2: Configurar el proyecto

1. Abre la carpeta del proyecto en **Visual Studio Code**

2. Copia el archivo de configuración:
```bash
copy .env.example .env
```

3. Edita el archivo `.env` con tus credenciales:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mi_inventario_db
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_DE_POSTGRES
JWT_SECRET=mi-secreto-jwt-super-seguro-2024
PORT=5000
```

### Paso 3: Instalar dependencias

Abre la terminal en VS Code (Ctrl + `) y ejecuta:

```bash
npm install
```

### Paso 4: Iniciar el servidor

```bash
npm start
```

O para desarrollo con recarga automática:

```bash
npm run dev
```

### Paso 5: Abrir en el navegador

Ve a: http://localhost:5000

## 📱 Uso

1. **Registrarse:** Crea una cuenta nueva
2. **Iniciar sesión:** Ingresa con tu email y contraseña
3. **Dashboard:** Administra tus productos (Crear, Ver, Editar, Eliminar)

## 🐳 Despliegue en Kubernetes

Ver la carpeta `kubernetes/` para los archivos de configuración.

## 📁 Estructura del Proyecto

```
mi-inventario/
├── app.js                 # Archivo principal
├── package.json           # Dependencias
├── .env                   # Variables de entorno (crear desde .env.example)
├── config/
│   └── database.js        # Configuración de PostgreSQL
├── middleware/
│   └── auth.js            # Middleware de autenticación JWT
├── routes/
│   ├── auth.js            # Rutas de login/registro
│   └── products.js        # Rutas CRUD de productos
├── views/
│   ├── login.ejs          # Página de login
│   ├── register.ejs       # Página de registro
│   └── dashboard.ejs      # Dashboard con productos
└── public/                # Archivos estáticos (CSS, JS, imágenes)
```

## 🔐 Credenciales por defecto

No hay credenciales por defecto. Debes registrarte para crear tu cuenta.

## ❓ Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en el archivo `.env`
- Asegúrate de que la base de datos `mi_inventario_db` exista

### Error "Cannot find module"
- Ejecuta `npm install` nuevamente

### El puerto 5000 está ocupado
- Cambia el puerto en el archivo `.env`
- O cierra la aplicación que está usando el puerto

## 📝 Licencia

MIT
