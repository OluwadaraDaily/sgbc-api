const Drive = use('Drive');
const fs = require("fs");
const monthsArray = use('App/Services/util/monthsArray');
const { differenceInSeconds } = require("date-fns");

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
  },

  async updateAllMedia(model, urlName) {
    const { rows: allMedia } = await model.query().fetch()
    for(const file of allMedia) {
			const secondsDifference = differenceInSeconds(new Date(), new Date(file.last_updated));
			if (secondsDifference >= 86400) {
				const signedUrl = await Drive.disk("s3").getSignedUrl(file.file_name, 86400);
        switch(urlName) {
          case 'image_url':
            await model.query().where({ id: file.id }).update({ image_url: signedUrl, last_updated: new Date() });
            break;
          
          case 'audio_url':
            await model.query().where({ id: file.id }).update({ audio_url: signedUrl, last_updated: new Date() });
            break;
          
          case 'file_url':
            await model.query().where({ id: file.id }).update({ file_url: signedUrl, last_updated: new Date() });
            break;

          case 'video_url':
            await model.query().where({ id: file.id }).update({ video_url: signedUrl, last_updated: new Date() });
            break;
        }
			}
		}
  }
}

module.exports = Utils