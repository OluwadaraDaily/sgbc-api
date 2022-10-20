'use strict'
const Drive = use('Drive');
const fs = require("fs");
const MediaAudio = use('App/Models/MediaAudio')
const MediaImage = use('App/Models/MediaImage')
const MediaVideo = use('App/Models/MediaVideo')
const Sermon = use('App/Models/Sermon')
const monthsArray = use('App/Services/util/monthsArray');
const Utils = use('App/Services/util/Utils')
const PastorService = use('App/Services/PastorService');
const { defaultImages } = use('App/Services/util/constants')

class UploadService {
	async uploadMedia(data, audioFile, imageFile) {
		let UploadAudioData, audioRecord, imageRecord, videoRecord
		// Check if the sermon exists
		const slug = Utils.generateSlug(data.title);
		const sermonExists = await Sermon.query().where({ slug: slug }).first()
		if (sermonExists) {
			return {
				status: "error",
				message: "Sermon already exists"
			}
		}

		if(audioFile) {
			UploadAudioData = await Utils.uploadSermonFile(data, audioFile, 'Audio')
			// Create MediaAudio record
			audioRecord = await MediaAudio.create({
				audio_url: UploadAudioData.url,
				pastor_id: data.pastor,
				file_name: UploadAudioData.fileName,
				last_updated: new Date()
			})
		}

		if(imageFile) {
			const UploadImageData = await Utils.uploadSermonFile(data, imageFile, 'Images')

			// Create MediaImage record
			imageRecord = await MediaImage.create({
				image_url: UploadImageData.url,
				file_name: UploadImageData.fileName,
				last_updated: new Date()
			})
		}

		if(data.video_url) {
			videoRecord = await MediaVideo.create({
				video_url: data.video_url,
				pastor_id: data.pastor
			})
		}
		
		// Create Sermon record
		const sermonRecord = await Sermon.create({
			title: data?.title || null,
			date_preached: UploadAudioData?.datePreached || null,
			pastor_id: data?.pastor || null,
			audio_id: audioRecord?.id || null,
			slug: UploadAudioData?.slug || null,
			image_id: imageRecord?.id || defaultImages[1],
			video_id: videoRecord?.id || null
		})

		if(imageFile) {
			// Update Image Record
			imageRecord.sermon_id = sermonRecord.id
			await imageRecord.save()
		}
		
		return {
			status: "success",
			data: sermonRecord
		}
	}
}

module.exports = UploadService