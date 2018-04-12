
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('wills', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.string('title');
      table.string('beneficiary');
      table.string('executor');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wills'),
  ]);
};

