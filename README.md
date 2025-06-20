# TODO-server challengue

Backend para una aplicación de gestión de tareas (TODO) desarrollado con Node.js, Express, TypeScript y PostgreSQL.

## Descripción

Este proyecto implementa la API RESTful para una aplicación tipo TODO. Permite gestionar usuarios y tareas, soportando operaciones de autenticación, creación, edición, listado y borrado de tareas. Incluye buenas prácticas de seguridad, validación y estructuración de código para facilitar el mantenimiento y la escalabilidad.

## Tecnologías principales

- **Node.js** 20+
- **Express** (framework web)
- **TypeScript** (tipado estático)
- **PostgreSQL** (base de datos relacional)
- **Sequelize** (ORM)
- **JWT** (autenticación)
- **bcrypt** (hashing de contraseñas)
- **Zod** (validación de datos)
- **Helmet** (seguridad HTTP)
- **CORS** (control de acceso)
- **ESLint** (linter)
- **Docker** (opcional, para despliegue)

## Instalación y uso local

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/814942/TODO-server.git
   cd TODO-server
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
Copia el archivo .env.example a .env y ajusta los valores:

4. **Ejecuta el servidor en modo desarrollo**
   ```bash
   npm run dev
   ```

## Endpoints principales
* GET /health — Chequeo de salud del servidor y la base de datos.
* POST /api/auth/login — Login de usuario.
* POST /api/auth/register — Registro de usuario.
* GET /api/tasks — Listado de tareas (requiere autenticación).
* POST /api/tasks — Crear tarea.
* PUT /api/tasks/:id — Editar tarea.
* DELETE /api/tasks/:id — Eliminar tarea.


## Seguridad y buenas prácticas
* Headers seguros con Helmet.
* CORS configurado.
* Variables de entorno con dotenv.
* JWT para autenticación.
* Hashing seguro de contraseñas con bcrypt.
* Validación de datos con Zod.
* Linting con ESLint y TypeScript.

---

🤘 by
Pablo Garay