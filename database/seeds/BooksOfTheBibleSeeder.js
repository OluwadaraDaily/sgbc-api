'use strict'

/*
|--------------------------------------------------------------------------
| BooksOfTheBibleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const BooksOfTheBible = use("App/Models/BooksOfTheBible.js")
const { booksOfTheBible } = use('App/Services/util/constants')
const Utils = use('App/Services/util/Utils')


class BooksOfTheBibleSeeder {
  async run () {
    for(const book of booksOfTheBible) {
      await BooksOfTheBible.create({
        name: book,
        slug: Utils.generateSlug(book)
      })
    }
  }
}

module.exports = BooksOfTheBibleSeeder
