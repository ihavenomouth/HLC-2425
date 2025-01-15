import { dbPromise } from '../database/database.js';

class UsuarioModel {
  async getAllUsuarios() {
    const db = await dbPromise;
    return db.all('SELECT * FROM USUARIO');
  }

  async getUsuarioById(id) {
    const db = await dbPromise;
    return db.get('SELECT * FROM USUARIO WHERE id = ?', id);
  }

  async createUsuario(nombre, email, clave) {
    const db = await dbPromise;
    return db.run('INSERT INTO USUARIO (nombre, email, clave) VALUES (?, ?, ?)', nombre, email, clave);
  }

  async deleteUsuario(id) {
    const db = await dbPromise;
    return db.run('DELETE FROM USUARIO WHERE id = ?', id);
  }
}

export default new UsuarioModel();