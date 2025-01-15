import bcrypt from 'bcryptjs';
import usuarioModel from '../models/UsuarioModel.js';

class UsuarioController{
  constructor() {  }
  
  async getUsuarios(req, res) {
    try {
      const usuarios = await usuarioModel.getAllUsuarios();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postUsuario(req, res) {    
    const {nombre, email, clave} = req.body ; 

    // console.log("Creación de un usuario");
    // console.log(req.body);
    const saltRounds = 10
    const claveHash = await bcrypt.hash(clave, saltRounds)
    
    try {
      const result = await usuarioModel.createUsuario(nombre, email, claveHash);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UsuarioController();