const knex = require('../../database/knex')
const state = require('../../enums/state_enums')
exports.listOrders = async function (ctx) {
  try {
    const orders = await knex('Orders')
    ctx.body = orders
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.orderByID = async function (ctx) {
  try {
    const order = await knex('Orders as o').join('Order_States as s', 's.id', 'o.id_order_state')
      .select('o.*', 's.name as id_order_state').where('o.id', ctx.params.id)

    ctx.body = order
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.addOrder = async function (ctx) {
  try {
    const [retval] = await knex('Orders').insert(ctx.request.body).returning('*')
    if (ctx.request.body.id_order_state === state.CONFIRMED) {
      await knex('Orders').where('id', retval.id).update({ approval_time: new Date().toISOString() })
    }
    ctx.body = retval
    ctx.status = 201
  } catch (e) {
    ctx.status = 500
    console.error(e)
  }
}
exports.updateOrderState = async function (ctx) {
  try {
    const [order] = await knex('Orders').where('id', ctx.params.id)
    const bodyState = ctx.request.body.id_order_state
    if (!order) {
      ctx.body = 'Order with selected id does not exist.'
      ctx.status = 400
    } else {
      if (order.id_order_state > bodyState) {
        ctx.body = 'You can not change status "backwards". Example: From state with id 2 to state with id 1'
        ctx.status = 400
      }
      if (order.id_order_state === state.CANCELED) {
        ctx.body = 'You can not change status when order is has already been canceled'
        ctx.status = 400
      } else {
        await knex('Orders').where('id', ctx.params.id).update(ctx.request.body)
        if (bodyState === state.CONFIRMED) { await knex('Orders').where('id', ctx.params.id).update({ approval_time: new Date().toISOString() }) }
        ctx.status = 200
      }
    }
  } catch (e) {
    console.error(e)
  }
}
exports.listOrdersByState = async function (ctx) {
  try {
    const orders = await knex('Orders').where('id_order_state', ctx.params.id)
    ctx.body = orders
  } catch (e) {
    console.error(e)
  }
}
