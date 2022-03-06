const Router = require('koa-joi-router')
const endpoints = require('./endpoints')
const Joi = Router.Joi

const router = Router()

router.route({
  method: 'get',
  path: '/',
  handler: endpoints.listOrders
})
router.route({
  method: 'get',
  path: '/:id',
  handler: endpoints.orderByID
})
router.route({
  method: 'post',
  path: '/',
  validate: {
    type: 'json',
    body: {
      approval_time: Joi.date(),
      id_order_state: Joi.number().integer().positive().required(),
      user_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.string().regex(/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/)
        .message('"phone_number" is not a valid phoneNumber')
    }
  },
  handler: endpoints.addOrder
})
// change state
router.route({
  method: 'put',
  path: '/:id/state',
  validate: {
    type: 'json',
    body: {
      id_order_state: Joi.number().integer().positive().required()
    }
  },
  handler: endpoints.updateOrderState
})
// get order with specific
router.route({
  method: 'get',
  path: '/state/:id',
  handler: endpoints.listOrdersByState
})
module.exports = router
