exports.up = (knex) => {
  return knex.schema.createTable('user_product', (table) => {
    table.increments()
    table.integer('user_id').unsigned()
      .index()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
    table.string('product_id', 36).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('user_product')
}
