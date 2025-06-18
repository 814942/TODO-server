# TODO-server

Servidor Express + TypeScript + PostgreSQL

## Scripts útiles

- `npm run dev` — Ejecuta el servidor en modo desarrollo con recarga automática.
- `npm run build` — Compila el código TypeScript a JavaScript.
- `npm start` — Ejecuta el servidor desde la carpeta `dist`.

## Variables de entorno
- `PORT` — Puerto del servidor (por defecto 3000)
- `DATABASE_URL` — Cadena de conexión a PostgreSQL
- `JWT_SECRET` — Secreto para firmar JWT

## Instalación y uso
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Copia `.env` y ajusta tus valores.
3. Ejecuta en desarrollo:
   ```bash
   npm run dev
   ```

---

## Estructura inicial sugerida

- `src/` — Código fuente
  - `index.ts` — Entrada principal
  - `routes/` — Rutas Express
  - `controllers/` — Lógica de negocio
  - `middlewares/` — Middlewares personalizados
  - `config/` — Configuración de base de datos y otros

---

## Seguridad y buenas prácticas
- Helmet para headers seguros
- CORS configurado
- Variables de entorno con dotenv
- JWT para autenticación
- Linting con ESLint y TypeScript
- Hashing seguro con bcrypt
- Validación de datos con Zod
