import express from 'express';
const router = express.Router();

import usuarioController from '../controllers/UsuarioController.js';

router.route('/')
  .get( usuarioController.getUsuarios )
  .post( usuarioController.postUsuario )
;

export default router;