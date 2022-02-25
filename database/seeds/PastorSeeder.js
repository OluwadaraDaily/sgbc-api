'use strict'

/*
|--------------------------------------------------------------------------
| PastorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Pastor = use('App/Models/Pastor')
const fs = require("fs");

class PastorSeeder {
  async run () {
    const existingPastors = await Pastor.all()

    if (!existingPastors.toJSON().length) {
      let data = fs.readFileSync("database/seeds/pastors.csv", "utf8")
      data = data.split("\n")
      
      for (let i in data) {
        data[i] = data[i].split(',')
        await Pastor.create({
          first_name: data[i][0],
          last_name: data[i][1]
        })
      }
    }
  }
}

module.exports = PastorSeeder
