'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddSermonSeriesIdToSermonsSchema extends Schema {
  up () {
    this.table('sermons', (table) => {
      // alter table
      table.string("sermon_series_id").references("sermon_series.id")
      table.string("book_of_the_bible_id").references("books_of_the_bibles.id")
    })
  }

  down () {
    this.table('sermons', (table) => {
      // reverse alternations
      table.dropColumn("sermon_series_id")
      table.dropColumn("book_of_the_bible_id")
    })
  }
}

module.exports = AddSermonSeriesIdToSermonsSchema
