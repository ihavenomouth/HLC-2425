import express from 'express';
const router = express.Router();

import notaController from '../controllers/NotaController.js';

router.route('/')
  .get( notaController.getNotas)
  .post( notaController.postNota)
;

router.route('/:id')
  .get ( notaController.getNota)
  .delete( notaController.deleteNota)
  .put( notaController.putNota );

export default router;
