import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'threads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      // one to one
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('title').notNullable()
      table.text('content').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
