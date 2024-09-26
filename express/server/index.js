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
import notasRoutes from './routes/notasRoutes.js';
app.use('/api/nota', notasRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
