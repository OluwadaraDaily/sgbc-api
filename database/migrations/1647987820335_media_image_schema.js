'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaImageSchema extends Schema {
  up () {
    this.create('media_images', (table) => {
      table.string("id").primary()
      table.string("image_url")
      table.string("sermon_id").references('sermons.id')
      table.string("file_name")
      table.datetime("last_updated")
      table.boolean('is_deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('media_images')
  }
}

module.exports = MediaImageSchema
