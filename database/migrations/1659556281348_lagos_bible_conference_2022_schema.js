'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LagosBibleConference2022Schema extends Schema {
  up () {
    this.create('lagos_bible_conference_2022_s', (table) => {
      table.string("id").primary()
      table.string("email").notNullable().unique()
      table.string("full_name")
      table.string("phone_number").notNullable().unique()
      table.string("means_of_information")
      table.string("other_means_of_information")
      table.string("location_from")
      table.jsonb("meta")
      table.timestamps()
    })
  }

  down () {
    this.drop('lagos_bible_conference_2022_s')
  }
}

module.exports = LagosBibleConference2022Schema
