import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'replies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // jika data user dan thread terhapus, data replynya juga akan di hapus
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('thread_id').unsigned().references('id').inTable('threads').onDelete('CASCADE')
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
