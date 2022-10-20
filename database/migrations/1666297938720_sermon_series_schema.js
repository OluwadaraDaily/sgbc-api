'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SermonSeriesSchema extends Schema {
  up () {
    this.create('sermon_series', (table) => {
      table.string("id").primary()
      table.string("name", 1000)
      table.string("slug", 1000)
      table.timestamps()
    })
  }

  down () {
    this.drop('sermon_series')
  }
}

module.exports = SermonSeriesSchema
