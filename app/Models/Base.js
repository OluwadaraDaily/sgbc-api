'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const randomString = require("randomstring")

class Base extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (rowInstance) => {
      rowInstance.id = randomString.generate({ length: 16, charset: 'alphanumeric' });
    })
  }

  static castDates (field, value) {
    if (field === 'created_at' || field === 'updated_at') {
      return value
    }
    return super.formatDates(field, value)
  }
}

module.exports = Base