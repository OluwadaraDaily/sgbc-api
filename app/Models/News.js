'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/Base');

class News extends BaseModel {
  newsImage() {
		return this.hasOne('App/Models/NewsImage', 'news_image_id', 'id')
	}
}

module.exports = News
