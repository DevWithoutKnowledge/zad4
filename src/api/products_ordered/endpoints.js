const knex = require('../../database/knex')

exports.listPrdOrdered = async function (ctx) {
  try {
    const prdOrdered = await knex('Products_Ordered')
    ctx.body = prdOrdered
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.PrdOrderedByID = async function (ctx) {
  try {
    const prdOrdered = await knex('Products_Ordered as o').join('Products as p', 'p.id', 'o.id_product').join('Categories as c', 'c.id', 'p.id_category')
      .select('o.id_product', 'p.name', 'p.description', 'p.price', 'p.weight', 'c.name as category', 'o.quantity', 'o.id_order').where('o.id_order', ctx.params.id)
    ctx.body = prdOrdered
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.addPrdOrdered = async function (ctx) {
  const orderID = ctx.request.body.id_order
  const productID = ctx.request.body.id_product
  try {
    const [prdOrdered] = await knex('Products_Ordered').insert(ctx.request.body).returning('*')
    ctx.body = prdOrdered
    ctx.status = 201
  } catch (e) {
    const [order] = await knex('Orders').where('id', orderID)
    const [product] = await knex('Products').where('id', productID)
    if (!order) {
      ctx.body = 'Order with selected id does not exist.'
      ctx.status = 400
    } else if (!product) {
      ctx.body = 'Product with selected id does not exist.'
      ctx.status = 400
    } else {
      ctx.status = 500
    }
    console.error(e)
  }
}
