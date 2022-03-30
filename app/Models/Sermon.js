'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/Base');

class Sermon extends BaseModel {
	sermonAudio() {
		return this.hasOne('App/Models/MediaAudio', 'audio_id', 'id')
	}
	sermonPastor() {
		return this.hasOne('App/Models/Pastor', 'pastor_id', 'id')
	}
	sermonImage() {
		return this.hasOne('App/Models/MediaImage', 'image_id', 'id')
	}
}

module.exports = Sermon
