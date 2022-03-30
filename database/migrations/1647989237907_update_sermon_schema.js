'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateSermonSchema extends Schema {
  up () {
    this.table('sermons', (table) => {
      // alter table
      table.string("image_id").references('media_images.id')
      table.enum("period_of_day", ['morning', 'evening'])
    })
  }

  down () {
    this.table('sermons', (table) => {
      // reverse alternations
      table.dropColumn("image_id")
      table.dropColumn("period_of_day")
    })
  }
}

module.exports = UpdateSermonSchema
