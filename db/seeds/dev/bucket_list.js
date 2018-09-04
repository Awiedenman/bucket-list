
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bucket_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('bucket_list').insert(
        {title: 'eating goals', description: 'Eat body weight in cabbage.'},
        {title: 'running goals', description: 'Never have to run again.'},
        'id');
    });
};
