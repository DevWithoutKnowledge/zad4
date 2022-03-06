const Router = require('koa-joi-router')
const endpoints = require('./endpoints')

const router = Router()

router.route({
  method: 'get',
  path: '/',
  handler: endpoints.listCategories
})

module.exports = router
