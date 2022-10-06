'use strict'
const Drive = use('Drive');
const fs = require("fs");
const Hymn = use('App/Models/Hymn')
const HymnAudio = use('App/Models/HymnAudio')
const { differenceInSeconds } = require("date-fns");
const Utils = use('App/Services/util/Utils')
const monthsArray = use('App/Services/util/monthsArray');

class HymnService {
  constructor() {
      this.drive = Drive;
      this.hymn = Hymn;
      this.hymnAudio = HymnAudio;
  }

  async fetchHymns() {
    const { rows: hymns } = await this.hymn.query().with('hymnAudio').fetch()
    return {
      status: 'success',
      statusCode: 200,
      message: 'Successfully fetched hymns',
      data: hymns
    }
  }

  async storeHymn(data, file) {
    let hymnAudio
    if(file) {
      // Upload Audio
      const format = "type/date/slug"
      const audioFormatData = {
        type: "Audio",
        date: `${monthsArray[new Date().getMonth()]}-${new Date().getFullYear()}`,
        slug: Utils.generateSlug(data.title)
      }
      
      const { url, fileName } = await Utils.uploadFile(file, format, audioFormatData)
      
      hymnAudio = await this.hymnAudio.create({
        audio_url: url,
        file_name: fileName,
        last_updated: new Date()
      })
    }
    const slug = Utils.generateSlug(data.title.replace(/  +/g, ' '))
    const hymn = await this.hymn.create({
      title: data.title ? data.title.replace(/  +/g, ' ') : null,
      slug: slug,
      chorus: data.chorus ? data.chorus.replace(/  +/g, ' ') : null,
      verse_1: data.verse_1 ? data.verse_1.replace(/  +/g, ' ') : null,
      verse_2: data.verse_2 ? data.verse_2.replace(/  +/g, ' ') : null,
      verse_3: data.verse_3 ? data.verse_3.replace(/  +/g, ' ') : null,
      verse_4: data.verse_4 ? data.verse_4.replace(/  +/g, ' ') : null,
      verse_5: data.verse_5 ? data.verse_5.replace(/  +/g, ' ') : null,
      verse_6: data.verse_6 ? data.verse_6.replace(/  +/g, ' ') : null,
      hymn_audio_id: hymnAudio ? hymnAudio.id : null
    })

    return {
      status: 'success',
      statusCode: 201,
      message: 'Hymn record created successfully',
      data: hymn
    }
  }
}

module.exports = HymnService