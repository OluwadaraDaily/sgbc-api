'use strict'

/*
|--------------------------------------------------------------------------
| CreateDefaultImageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const MediaImage = use("App/Models/MediaImage.js")
const Database = use('Database')

class CreateDefaultImageSeeder {
  async run () {
    await Database.table('media_images').insert([
      {
        id: "Ca40mhMUARsSlOcO",
        image_url: "https://sgbc.ams3.digitaloceanspaces.com/Static/SermonDefaultImage/September%20services.png",
        file_name: "Static/SermonDefaultImage/September-services.png"
      },
      {
        id: "voWpBawiYQeaCZIS",
        image_url: "https://sgbc.ams3.digitaloceanspaces.com/Static/SermonDefaultImage/cross.jpg",
        file_name: "Static/SermonDefaultImage/cross.jpg"
      }
    ])
  }
}

module.exports = CreateDefaultImageSeeder
