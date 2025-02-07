import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import usuarioModel from '../models/UsuarioModel.js';

class LoginController{
  constructor() {  }
  
  async postLogin(req, res) {    
    const {email, clave} = req.body;
    const usuario = await usuarioModel.getUsuarioByEmail( email );
    console.log(usuario);

    let loginCorrecto = false;
    if( usuario && await bcrypt.compare(clave, usuario.clave) )
      loginCorrecto = true;

    if (!loginCorrecto) {
      console.log("Login incorrecto");
      return res.status(401).json({error: "E-mail o password incorrecto"});
    }

    const usuarioForToken = {
      email: usuario.email,
      id: usuario.id,
    }

    const token = jwt.sign(usuarioForToken, process.env.SECRET);
    // const token = jwt.sign(usuarioForToken, process.env.SECRET, { expiresIn: 3600 })
    res
      .status(200)
      .send({ token, nombre: usuario.nombre, email: usuario.email })
    ;
  }
}

export default new LoginController();