import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createDatabase() {
  const db = await open({
    filename: path.join(__dirname, 'database.db'),
    driver: sqlite3.Database
  });

  // Ejecutar PRAGMA para habilitar claves foráneas
  await db.run(`PRAGMA foreign_keys = ON;`);
  const result = await db.get('PRAGMA foreign_keys;');
  console.log('Foreign key status:', result); //si obtenemos un 1 es que está activo

  await db.exec(`
    CREATE TABLE IF NOT EXISTS USUARIO (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      clave TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS NOTA (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      texto TEXT NOT NULL,
      fecha TEXT NOT NULL,
      usuario_id INTEGER NOT NULL,
      FOREIGN KEY(usuario_id) REFERENCES USUARIO(id) ON DELETE CASCADE
    );
  `);

  return db;
}

export const dbPromise = createDatabase();
