'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaVideoSchema extends Schema {
  up () {
    this.create('media_videos', (table) => {
      table.string("id").primary()
      table.string("video_url")
      table.string("pastor_id").references("pastors.id")
      table.timestamps()
    })
  }

  down () {
    this.drop('media_videos')
  }
}

module.exports = MediaVideoSchema
