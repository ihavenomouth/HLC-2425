import { dbPromise } from '../database/database.js';

class NotaModel {
  async getAllNotas() {
    const db = await dbPromise;
    return db.all('SELECT * FROM NOTA');
  }

  async getNotaById(id) {
    const db = await dbPromise;
    return db.get('SELECT * FROM NOTA WHERE id = ?', id);
  }

  async createNota(nombre, texto, fecha, usuario_id) {
    const db = await dbPromise;
    return db.run('INSERT INTO NOTA (nombre, texto, fecha, usuario_id) VALUES (?, ?, ?, ?)', nombre, texto, fecha, usuario_id);
  }

  async updateNota(id, nombre, texto, fecha, usuario_id) {
    const db = await dbPromise;
    return db.run('UPDATE NOTA SET nombre = ?, texto = ?, fecha = ?, usuario_id = ? WHERE id = ?', nombre, texto, fecha, usuario_id, id);
  }

  async deleteNota(id) {
    const db = await dbPromise;
    return db.run('DELETE FROM NOTA WHERE id = ?', id);
  }
}

export default new NotaModel();