const Drive = use('Drive');
const fs = require("fs");
const monthsArray = use('App/Services/util/monthsArray');

const Utils = {
  async uploadSermonFile(data, incFile, type) {
    // Format Date
		const dateArray = data.date_preached.split('-')
		const datePreached = new Date(Number(dateArray[0]), (Number(dateArray[1]) - 1), Number(dateArray[2]))
		
    // Slugify the name of the sermon and save it in a file based on month and year
		const slug = this.generateSlug(data.title)

    const format = "type/date/slug"
    const formatData = {
      type: type,
      date: `${monthsArray[datePreached.getMonth()]}-${dateArray[0]}`,
      slug: slug
    }
		
    const { url, fileName } = await this.uploadFile(incFile, format, formatData)

    return {
      datePreached,
      slug,
      fileName,
      url
    }
  },

  async uploadFile(incFile, format, formatData) {
    // format = "type/date/slug"
    const formatArray = format.split('/')
    
    const file = fs.readFileSync(incFile.tmpPath);
		const fileName = `${formatData[formatArray[0]]}/${formatData[formatArray[1]]}/${formatData[formatArray[2]]}.${incFile.extname}`
		await Drive.disk('s3').put(fileName, file);
		const url = await Drive.disk('s3').getSignedUrl(fileName, 86400)

    return { url, fileName }
  },

  generateSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-')
  }
}

module.exports = Utils