import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/authMiddleware.js';

import notaController from '../controllers/NotaController.js';

// Ruta protegida
// router.delete('/:id', verifyToken, notaController.deleteNota);
router.route('/')
  .get( notaController.getNotas )
  .post( verifyToken, notaController.postNota )
;

router.route('/:id')
  .get( notaController.getNota )
  .delete( verifyToken, notaController.deleteNota )
  .put( verifyToken, notaController.putNota )
;

export default router;