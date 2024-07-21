// middlewares/verifyAuth.js
const jwt = require('jsonwebtoken');

function verifyAuth(req, res, next) {

  // Obtém o token dos cookies
  const token = req.cookies.token;
  
  // Se o token não existir, retorna um erro
  if (!token) {
    return res.status(401).json({ error: 'Token não existe' });
  }

  try {

    // Decodifica o JWT usando a chave secreta
    const decoded = jwt.verify(token, 'sd');
    
    // Verifica se o id do usuário está presente no token
    if (!decoded.sub) {
      return res.status(401).json({ error: 'ID do usuário não encontrado' });
    }

    // Adiciona o id do usuário ao objeto `req`
    req.user = { id: decoded.sub };
    // console.log(req.user)

    // Chama o próximo middleware ou a rota
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = verifyAuth;
