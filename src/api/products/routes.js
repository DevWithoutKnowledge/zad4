const Router = require('koa-joi-router')
const endpoints = require('./endpoints')
const Joi = Router.Joi

const router = Router()

router.route({
  method: 'get',
  path: '/',
  handler: endpoints.listProducts
})

router.route({
  method: 'get',
  path: '/:id',
  handler: endpoints.productByID
})
router.route({
  method: 'post',
  path: '/',
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().positive().precision(2).required(),
      weight: Joi.number().positive().precision(3).required(),
      id_category: Joi.number().integer().positive().required()
    }
  },
  handler: endpoints.addProduct
})

router.route({
  method: 'put',
  path: '/:id',
  validate: {
    body: {
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().positive().precision(2),
      weight: Joi.number().positive().precision(3),
      id_category: Joi.number().integer().positive()
    },
    type: 'json'
  },
  handler: endpoints.updateProduct
})
module.exports = router
