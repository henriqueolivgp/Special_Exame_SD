/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    { username: 'admin', password: 'admin', role: 'admin'},
    { username: 'edit', password: 'edit', role: 'edit'},
    { username: 'view', password: 'view', role: 'view'},
  ]);
};
