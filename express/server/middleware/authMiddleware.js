import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Elimina 'Bearer ' del header "Authorization"
    token = token.replace('Bearer ', '');

    const decodedToken = jwt.verify(token, process.env.SECRET);
    
    // Almacena la información del usuario decodificada en req.usuario
    req.usuario = {
      email: decodedToken.email,  // Asumiendo que el ID del usuario está en el token
      id: decodedToken.id,  // Asumiendo que el nombre de usuario está en el token
      // Puedes añadir más campos según lo que hayas incluido en el token
    };

    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

export default verifyToken;