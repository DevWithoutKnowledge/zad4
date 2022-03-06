const knex = require('../../database/knex')
exports.listCategories = async function (ctx) {
  try {
    const categories = await knex('Categories')
    ctx.body = categories
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
