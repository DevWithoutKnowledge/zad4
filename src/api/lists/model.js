const database = require('../../database/my_db')
exports.create = async function () {
  return database.queryOne(`INSERT INTO "Category" (name) VALUES($1) RETURNING *`,
    ['agd'])
}

// const StatesEnum = {
//     UNCONFIRMED: 1,
//     CONFIRMED: 2,
//     CANCELED: 3,
//     DONE: 4
// }

// const row = { id: 124, state: 2 }

// // if (state === StatesEnum.UNCONFIRMED)
