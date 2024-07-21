/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').insert([
    { typeRole: 'admin'},
    { typeRole: 'edit'},
    { typeRole: 'view'}
  ]);
};
