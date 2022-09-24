'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PodcastImageSchema extends Schema {
  up () {
    this.create('podcast_images', (table) => {
      table.string("id").primary()
      table.string("image_url")
      table.string("file_name")
      table.datetime("last_updated")
      table.boolean('is_deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('podcast_images')
  }
}

module.exports = PodcastImageSchema
