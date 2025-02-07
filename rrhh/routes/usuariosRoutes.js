import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/authMiddleware.js';

import usuarioController from '../controllers/UsuarioController.js';

// Ruta protegida
// router.delete('/:id', verifyToken, notaController.deleteNota);
router.route('/')
  .get( usuarioController.getUsuarios )
  .post( usuarioController.postUsuario )
;

router.route('/:id')
  .get( usuarioController.getUsuario)
  .delete( verifyToken, usuarioController.deleteUsuario )
  .put( verifyToken, usuarioController.putUsuario )
;

export default router;