'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/Base');

class SermonSeries extends BaseModel {
  static get table() {
    return 'sermon_series'
  }
}

module.exports = SermonSeries
