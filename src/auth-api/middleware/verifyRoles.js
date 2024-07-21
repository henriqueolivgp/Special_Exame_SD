const knexConfig = require('../knexfile').db;
const knex = require('knex')(knexConfig);

function verifyRoles(requiredRoles) {
  return async (req, res, next) => {
    try {

      if ( !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const userId = req.user.id; // Supondo que o ID do usuário está disponível no req.user após autenticação
      
      // Verifica o role_id do usuário na tabela 'users'
      const user = await knex('users').where({ id: userId }).first();
      if (!user) {
        return res.status(403).json({ error: 'User not found' });
      }

      // Obtém o tipo de papel do usuário a partir da tabela 'roles'
      const role = await knex('roles').where({ id: user.role_id }).first();
      if (!role) {
        return res.status(403).json({ error: 'Role not found' });
      }

      // Verifica se o tipo de papel está entre os papéis exigidos
      if (!requiredRoles.includes(role.typeRole)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // Se o usuário tiver um papel válido, continua para o próximo middleware ou rota
      next();
    } catch (error) {
      console.error('Error in verifyRoles middleware:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = verifyRoles;

