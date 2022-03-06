const Router = require('koa-joi-router')
// const database = require('../database/my_db.js')
const categories = require('api/categories/routes')
const products = require('api/products/routes')
const orderStates = require('api/order_states/routes')
const orders = require('api/orders/routes')
const productsOrdered = require('api/products_ordered/routes')

const router = Router()
router.use('/categories', categories.middleware())
router.use('/products', products.middleware())
router.use('/states', orderStates.middleware())
router.use('/orders', orders.middleware())
router.use('/products_ordered', productsOrdered.middleware())

module.exports = router
