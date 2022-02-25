'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateSermonSchema extends Schema {
  up () {
    this.table('sermons', (table) => {
      // alter table
      table.string("slug")
    })
  }

  down () {
    this.table('sermons', (table) => {
      // reverse alternations
      table.dropColumn("slug")
    })
  }
}

module.exports = UpdateSermonSchema
