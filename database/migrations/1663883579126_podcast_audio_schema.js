'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PodcastAudioSchema extends Schema {
  up () {
    this.create('podcast_audios', (table) => {
      table.string("id").primary()
      table.string("audio_url")
      table.string("file_name")
      table.datetime("last_updated")
      table.boolean('is_deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('podcast_audios')
  }
}

module.exports = PodcastAudioSchema
