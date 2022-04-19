'use strict'
const Drive = use('Drive');
const fs = require("fs");
const MediaAudio = use('App/Models/MediaAudio')
const MediaImage = use('App/Models/MediaImage')
const Sermon = use('App/Models/Sermon')
const monthsArray = use('App/Services/util/monthsArray');
const Utils = use('App/Services/util/Utils')
const PastorService = use('App/Services/PastorService');

class UploadService {
	async uploadMedia(data, audioFile, imageFile) {
		// Check if the sermon exists
		const slug = Utils.slugify(data.title);
		const sermonExists = await this.sermon.query().where({ slug: slug }).first()
		if (sermonExists) {
			return {
				status: "error",
				message: "Sermon already exists"
			}
		}
		const UploadAudioData = await Utils.uploadSermonFile(data, audioFile, 'Audio')
		const UploadImageData = await Utils.uploadSermonFile(data, imageFile, 'Images')

		// Create MediaAudio record
		const audioRecord = await MediaAudio.create({
			audio_url: UploadAudioData.url,
			pastor_id: data.pastor,
			file_name: UploadAudioData.fileName,
			last_updated: new Date()
		})

		// Create MediaImage record
		let imageRecord = await MediaImage.create({
			image_url: UploadImageData.url,
			file_name: UploadImageData.fileName,
			last_updated: new Date()
		})

		// Create Sermon record
		const sermonRecord = await Sermon.create({
			title: data.title,
			date_preached: UploadAudioData.datePreached,
			pastor_id: data.pastor,
			audio_id: audioRecord.id,
			slug: UploadAudioData.slug,
			image_id: imageRecord.id
		})

		// Update Image Record
		imageRecord.sermon_id = sermonRecord.id
		await imageRecord.save()
		
		return {
			status: "success",
			data: sermonRecord
		}
	}
}

module.exports = UploadService