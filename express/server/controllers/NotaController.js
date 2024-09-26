class NotaController{
  constructor() {  }

  getNota(req,res){
    res.send('Info. de una nota');
  }
  getNotas(req,res){
    res.send('Info. de todas las notas');
  }
  postNota(req,res){
    res.send('Nuevo nota');
  }
  putNota(req,res){
    res.send('Modificar nota');
  }
  deleteNota(req,res){
    res.send('Eliminar nota');
  }
}

export default new NotaController();