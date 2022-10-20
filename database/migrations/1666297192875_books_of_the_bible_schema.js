'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksOfTheBibleSchema extends Schema {
  up () {
    this.create('books_of_the_bibles', (table) => {
      table.string("id").primary()
      table.string("name")
      table.string("slug", 500)
      table.timestamps()
    })
  }

  down () {
    this.drop('books_of_the_bibles')
  }
}

module.exports = BooksOfTheBibleSchema
