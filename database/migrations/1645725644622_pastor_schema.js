'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PastorSchema extends Schema {
  up () {
    this.create('pastors', (table) => {
      table.string("id").primary()
      table.string('first_name')
      table.string("last_name")
      table.timestamps()
    })
  }

  down () {
    this.drop('pastors')
  }
}

module.exports = PastorSchema
