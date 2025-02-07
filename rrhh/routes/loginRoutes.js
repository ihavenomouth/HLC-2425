import express from 'express';
const router = express.Router();
import loginController from '../controllers/LoginController.js';

router.route('/')
  .post( loginController.postLogin )
;

export default router;