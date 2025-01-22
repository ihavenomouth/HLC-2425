// import notas from '../database/notas.json' with { type: 'json' };
import notaModel from '../models/NotaModel.js';

class NotaController{
  constructor() {  }

  async getNota(req,res){
    console.log(req.params);
    try {
      const nota = await notaModel.getNotaById(req.params.id);
      if (nota) {
        res.json(nota);
      } else {
        res.status(404).json({ error: 'Nota no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getNotas(req,res){
    try {
      const notas = await notaModel.getAllNotas();
      res.json(notas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postNota(req,res){
    const {nombre, texto, fecha} = req.body ; 

    try {
      const result = await notaModel.createNota(nombre, texto, fecha, req.usuario.id);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async putNota(req,res){
    try {
      const result = await notaModel.updateNota(req.params.id, req.body.nombre, req.body.texto, req.body.fecha, req.body.usuario_id);
      if (result.changes > 0) {
        res.json({ message: 'Nota actualizada' }); 
      } else {
        res.status(404).json({ error: 'Nota no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // async deleteNota(req,res){
  //   try {
  //     const result = await notaModel.deleteNota(req.params.id);
  //     if (result.changes > 0) {
  //       res.json({ message: 'Nota eliminada' }); 
  //     } else {
  //       res.status(404).json({ error: 'Nota no encontrada' });
  //     }
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }

  async deleteNota(req,res){  
    try {    
      // Si no somos el administrador, tenemos que ver si somos el propietario
      if(req.usuario.email != "j@j.es"){
        const nota = await notaModel.getNotaById(req.params.id);
        if(nota && nota.usuario_id != req.usuario.id){
          throw new Error("Sólo el administrador puede eliminar una nota que no le pertenece.");
        }
      }
      
      const result = await notaModel.deleteNota(req.params.id);
      if (result.changes > 0) {
        res.json({ message: 'Nota eliminada' }); 
      } else {
        res.status(404).json({ error: 'Nota no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default new NotaController();