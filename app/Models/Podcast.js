'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/Base');

class Podcast extends BaseModel {
  podcastImage() {
		return this.hasOne('App/Models/PodcastImage', 'podcast_image_id', 'id')
	}

  podcastAudio() {
		return this.hasOne('App/Models/PodcastAudio', 'podcast_audio_id', 'id')
  }
}

module.exports = Podcast
