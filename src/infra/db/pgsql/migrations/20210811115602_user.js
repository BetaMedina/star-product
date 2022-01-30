
exports.up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.string('email', 100).unique().notNullable()
    table.string('name', 70).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex) => {
  knex.schema.dropTable('user')
}
