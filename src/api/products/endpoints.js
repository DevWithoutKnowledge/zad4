const knex = require('../../database/knex')

exports.listProducts = async function (ctx) {
  try {
    const products = await knex('Products')
    ctx.body = products
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.productByID = async function (ctx) {
  try {
    const products = await knex('Products').where('id', ctx.params.id)
    ctx.body = products
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.addProduct = async function (ctx) {
  try {
    const [retval] = await knex('Products').insert(ctx.request.body).returning('*')
    ctx.body = retval
    ctx.status = 201
  } catch (e) {
    console.error(e)
  }
}
exports.updateProduct = async function (ctx) {
  const categoryId = ctx.request.body.id_category
  try {
    const [product] = await knex('Products').where('id', ctx.params.id)
    if (!product) {
      ctx.body = 'Product with selected id does not exist.'
      ctx.status = 400
    } else {
      const [updated] = await knex('Products').where('id', ctx.params.id).update(ctx.request.body).returning('*')
      ctx.status = 200
      ctx.body = updated
    }
  } catch (e) {
    const [category] = await knex('Category').where('id', categoryId)
    if (!category) {
      ctx.body = 'Category with selected id does not exist.'
      ctx.status = 400
    } else {
      ctx.status = 500
    }
    console.error(e)
  }
}
