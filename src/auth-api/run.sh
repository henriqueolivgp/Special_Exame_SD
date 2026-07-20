#!/bin/bash

npm install;

npm run migrate;

# Só faz seed se ainda não houver utilizadores (evita erro de username duplicado
# e evita ressuscitar utilizadores que o admin já apagou, em cada restart)
node -e "
const knex = require('knex')(require('./knexfile').db);
knex('users').count('id as count').first().then(async (row) => {
  if (Number(row.count) === 0) {
    console.log('Nenhum utilizador encontrado, a correr seed inicial...');
    await knex.seed.run();
  } else {
    console.log('Utilizadores já existem, seed ignorado.');
  }
  process.exit(0);
}).catch((err) => { console.error(err); process.exit(0); });
"

if [ "$USE_DEV_MODE" = "true" ];
  then npm run watch;
  else npm run start;
fi