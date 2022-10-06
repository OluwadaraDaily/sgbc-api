'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/Base');

class Hymn extends BaseModel {
  hymnAudio() {
		return this.hasOne('App/Models/HymnAudio', 'hymn_audio_id', 'id')
	}
}

module.exports = Hymn
