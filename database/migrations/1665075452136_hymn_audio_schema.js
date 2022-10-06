'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HymnAudioSchema extends Schema {
  up () {
    this.create('hymn_audios', (table) => {
      table.string("id").primary()
      table.string("audio_url")
      table.string("file_name")
      table.datetime("last_updated")
      table.boolean('is_deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('hymn_audios')
  }
}

module.exports = HymnAudioSchema
