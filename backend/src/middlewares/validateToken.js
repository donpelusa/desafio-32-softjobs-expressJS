const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); // 'Bearer <token>'
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    // Obtener solo la segunda parte, que es el <token>
    const token = authHeader.split(' ')[1]; 
    
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };
  


module.exports = validateToken;