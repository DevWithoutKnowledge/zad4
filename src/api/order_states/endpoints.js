const knex = require('../../database/knex')
exports.listStates = async function (ctx) {
  try {
    const states = await knex('Order_States')
    ctx.body = states
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
