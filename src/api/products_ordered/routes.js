const Router = require('koa-joi-router')
const endpoints = require('./endpoints')
const Joi = Router.Joi

const router = Router()

router.route({
  method: 'get',
  path: '/',
  handler: endpoints.listPrdOrdered
})

router.route({
  method: 'get',
  path: '/order/:id',
  handler: endpoints.PrdOrderedByID
})
router.route({
  method: 'post',
  path: '/',
  validate: {
    type: 'json',
    body: {
      id_product: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
      id_order: Joi.number().integer().positive().required()
    }
  },
  handler: endpoints.addPrdOrdered
})
module.exports = router
