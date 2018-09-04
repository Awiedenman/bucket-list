
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bucket_list', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
    }, id)
  ])
};

exports.down = function (knex, Promise) {
  Promise.all([
    knex.schema.dropTable('bucket_list')
  ])
};
