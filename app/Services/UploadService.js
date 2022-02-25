'use strict'
const Drive = use('Drive');
const fs = require("fs");
const MediaAudio = use('App/Models/MediaAudio')
const Sermon = use('App/Models/Sermon')
const monthsArray = use('App/Services/util/monthsArray');
const PastorService = use('App/Services/PastorService');

class UploadService {
	async uploadMedia(data, audioFile) {
		// const pastorRecord = await PastorService.getPastor(data.pastor)
		// Format Date
		const dateArray = data.date_preached.split('-')
		const datePreached = new Date(Number(dateArray[0]), (Number(dateArray[1]) - 1), Number(dateArray[2]))
		
		// Slugify the name of the sermon and save it in a file based on month and year
		// TO-DO: Use Moment or Date FNS to use the date sent from the front end to get the name of the month and the year
		// Folder name would be like: April-2019 **Something like this...
		const slug = data.title.replace(/\s+/g, '-')
		const file = fs.readFileSync(audioFile.tmpPath);
		const fileName = `${monthsArray[datePreached.getMonth()]}-${dateArray[0]}/${slug}-${data.date_preached}.${audioFile.extname}`
		await Drive.disk('s3').put(fileName, file);
		const audioUrl = await Drive.disk('s3').getSignedUrl(fileName, 86400)

		// Create MediaAudio record
		const audioRecord = await MediaAudio.create({
			audio_url: audioUrl,
			pastor_id: data.pastor
		})

		// Create Sermon record
		const sermonRecord = await Sermon.create({
			title: data.title,
			date_preached: datePreached,
			pastor_id: data.pastor,
			audio_id: audioRecord.id,
			slug: slug
		})
		
		return sermonRecord
	}
}

module.exports = UploadService