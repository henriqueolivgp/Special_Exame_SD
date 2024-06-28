// ./db/migrations/20240628120000_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.timestamps(true, true); // adiciona colunas created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
