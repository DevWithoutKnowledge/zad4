const Koa = require('koa')
const router = require('../routing/my_routes.js')
const ResponseTime = require('koa-response-time')
const bodyParser = require('koa-bodyparser')
const Morgan = require('koa-morgan')
const cors = require('@koa/cors')
// const db = require('../database/my_db.js')

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(ResponseTime())
app.use(Morgan('combined'))
app.use(router.middleware())

exports.start = async function () {
  try {
    // await db.start()
    console.log('Database connected')
    this.server = await app.listen(3000)
    console.log('Server listening 3000')
  } catch (error) {
    console.log(error)
  }
}
exports.close = async function () {
  await this.server.close()
  //  await db.close()
}
