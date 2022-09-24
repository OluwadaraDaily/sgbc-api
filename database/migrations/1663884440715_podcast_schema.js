'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PodcastSchema extends Schema {
  up () {
    this.create('podcasts', (table) => {
      table.string("id").primary()
      table.string("title")
      table.integer("episode_number")
      table.datetime("date_recorded")
      table.string("podcast_image_id").references("podcast_images.id")
      table.string("podcast_audio_id").references("podcast_audios.id")
      table.timestamps()
    })
  }

  down () {
    this.drop('podcasts')
  }
}

module.exports = PodcastSchema
