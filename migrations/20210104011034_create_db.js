
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('Categories', function (table) {
      table.increments('id').primary()
      table.string('name').notNullable()
    })
    .createTable('Products', function (table) {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.decimal('price').notNullable()
      table.decimal('weight').notNullable()
      table.integer('id_category').references('id').inTable('Categories')
    })
    .createTable('Order_States', function (table) {
      table.increments('id').primary()
      table.string('name').notNullable()
    })
    .createTable('Orders', function (table) {
      table.increments('id').primary()
      table.date('approval_time').nullable()
      table.integer('id_order_state').references('id').inTable('Order_States')
      table.string('user_name').notNullable()
      table.string('email').notNullable()
      table.string('phone_number').notNullable()
    })
    .createTable('Products_Ordered', function (table) {
      table.increments('id').primary()
      table.integer('id_product').references('id').inTable('Products')
      table.integer('quantity').notNullable()
      table.integer('id_order').references('id').inTable('Orders')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('Products_Ordered')
    .dropTable('Orders')
    .dropTable('Order_State')
    .dropTable('Products')
    .dropTable('Categories')
}
