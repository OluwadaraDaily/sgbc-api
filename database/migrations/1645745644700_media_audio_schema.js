'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaAudioSchema extends Schema {
  up () {
    this.create('media_audios', (table) => {
      table.string("id").primary()
      table.string("audio_url")
      table.string("pastor_id").references("pastors.id")
      table.timestamps()
    })
  }

  down () {
    this.drop('media_audios')
  }
}

module.exports = MediaAudioSchema
