// server/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 80;

// Recrear __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para servir archivos estáticos del cliente (html, css, js, imágenes...)
app.use(express.static(path.join(__dirname, '../client')));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

//Las rutas para las notas
import notasRoutes from './routes/notasRoutes.js';
app.use("/api/nota",notasRoutes);

//Las rutas para los usuarios
import usuariosRoutes from './routes/usuariosRoutes.js';
app.use("/api/usuario",usuariosRoutes);

//Las rutas para el login
import loginRoutes from './routes/loginRoutes.js';
app.use("/api/login",loginRoutes);



// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// Base de datos
import { dbPromise } from './database/database.js';

// Asegurar de que la base de datos está inicializada antes de iniciar el servidor
dbPromise.then(() => {
  app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al inicializar la base de datos', err);
  process.exit(1);
});
