'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HymnSchema extends Schema {
  up () {
    this.create('hymns', (table) => {
      table.string("id").primary()
      table.string("title", 500)
      table.string("slug", 1000)
      table.string("chorus", 2000)
      table.string("verse_1", 2000)
      table.string("verse_2", 2000)
      table.string("verse_3", 2000)
      table.string("verse_4", 2000)
      table.string("verse_5", 2000)
      table.string("verse_6", 2000)
      table.string("hymn_audio_id").references("hymn_audios.id")
      table.timestamps()
    })
  }

  down () {
    this.drop('hymns')
  }
}

module.exports = HymnSchema
