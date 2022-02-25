'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SermonSchema extends Schema {
  up () {
    this.create('sermons', (table) => {
      table.string("id").primary()
      table.string("title")
      table.datetime("date_preached")
      table.string("pastor_id").references("pastors.id")
      table.string("audio_id").references("media_audios.id")
      table.string("video_id").references("media_videos.id")
      table.timestamps()
    })
  }

  down () {
    this.drop('sermons')
  }
}

module.exports = SermonSchema
