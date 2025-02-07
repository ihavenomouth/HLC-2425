// import notas from '../database/notas.json' with { type: 'json' };
import bcrypt from 'bcryptjs';
import usuarioModel from '../models/UsuarioModel.js';

class UsuarioController{
  constructor() {  }

  async getUsuario(req,res){
    console.log(req.params);
    try {
      const usuario = await usuarioModel.getUsuarioById(req.params.id);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUsuarios(req,res){
    try {
      const usuarios = await usuarioModel.getAllUsuarios();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postUsuario(req,res){
    const {nombre, email, clave} = req.body ;
    const saltRounds = 10
    const claveHash = await bcrypt.hash(clave, saltRounds)
    //console.log(req.body);
    try {
      const result = await usuarioModel.createUsuario(nombre, email, claveHash);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async putUsuario(req,res){
    if(req.usuario.id != req.params.id){
      res.status(400).json({ error: 'No tiene permiso para actualizar el usuario' });
      return;
    }

    try {
      const result = await usuarioModel.updateNota(req.params.id, req.body.nombre, req.body.email, req.body.clave, req.body.tlf, req.body.dni);
      if (result.changes > 0) {
        res.json({ message: 'Usuario actualizado' }); 
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUsuario(req,res){
    if(req.usuario.id != req.params.id){
      res.status(400).json({ error: 'No tiene permiso para eliminar el usuario' });
      return;
    }

    try {
      const result = await usuarioModel.deleteUsuario(req.params.id);
      if (result.changes > 0) {
        res.json({ message: 'Usuario eliminado' }); 
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UsuarioController();