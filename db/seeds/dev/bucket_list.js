
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bucket_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('bucket_list').insert([
        {id: 1, title: 'eating goals', description: 'Eat body weight in cabbage.'},
        {id: 2, title: 'running goals', description: 'Never have to run again.'},
      ]);
    });
};
