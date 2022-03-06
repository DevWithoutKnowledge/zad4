
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Order_States').del()
    .then(function () {
      // Inserts seed entries
      return knex('Order_States').insert([
        { id: 1, name: 'UNCONFIRMED' },
        { id: 2, name: 'CONFIRMED' },
        { id: 3, name: 'CANCELED' },
        { id: 4, name: 'DONE' }
      ])
    })
}
