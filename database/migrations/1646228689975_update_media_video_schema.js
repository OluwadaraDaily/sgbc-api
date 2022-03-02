'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateMediaVideoSchema extends Schema {
  up () {
    this.table('media_videos', (table) => {
      // alter table
      table.string("file_name")
      table.datetime("last_updated")
      table.boolean('is_deleted').defaultTo(false)
    })
  }

  down () {
    this.table('media_videos', (table) => {
      // reverse alternations
      table.dropColumn("file_name")
      table.dropColumn("last_updated")
      table.dropColumn('is_deleted')
    })
  }
}

module.exports = UpdateMediaVideoSchema
