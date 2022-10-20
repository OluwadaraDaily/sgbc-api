'use strict'
const Drive = use('Drive');
const fs = require("fs");
const MediaAudio = use('App/Models/MediaAudio')
const MediaImage = use('App/Models/MediaImage')
const MediaVideo = use('App/Models/MediaVideo')
const Sermon = use('App/Models/Sermon')
const { differenceInSeconds } = require("date-fns");
const Utils = use('App/Services/util/Utils')
const BooksOfTheBible = use("App/Models/BooksOfTheBible.js")

class SermonService {
	constructor() {
		this.drive = Drive;
		this.mediaAudio = MediaAudio;
		this.sermon = Sermon;
		this.mediaImage = MediaImage;
		this.mediaVideo = MediaVideo;
	}
	async getAllAudioSermons() {
		let allAudioSermons = await this.sermon.query().whereNotNull('audio_id').with('sermonAudio').with('sermonImage').fetch()
		let allAudioFiles = allAudioSermons.toJSON()

		for(const audioFile of allAudioFiles) {
			const secondsDifference = differenceInSeconds(new Date(), new Date(audioFile.sermonAudio.last_updated));
			if (secondsDifference >= 86400) {
				const signedUrl = await this.drive.disk("s3").getSignedUrl(audioFile.sermonAudio.file_name, 86400);
				await this.mediaAudio.query().where({ id: audioFile.sermonAudio.id }).update({ audio_url: signedUrl, last_updated: new Date() });
				if(audioFile.sermonImage) { 
					const imgSignedUrl = await this.drive.disk('s3').getSignedUrl(audioFile.sermonImage.file_name, 86400) 
					await this.mediaImage.query().where({ id: audioFile.sermonImage.id }).update({ image_url: imgSignedUrl, last_updated: new Date() });
				}
			}
		}
		allAudioSermons = await this.sermon.query()
			.whereNotNull('audio_id')
			.with('sermonAudio')
			.with('sermonPastor')
			.with('sermonImage')
			.fetch()
		return allAudioSermons.toJSON()
	}

	async getAllSermons({ filter_by_speaker, filter_by_series, filter_by_book }) {
		await this.getAllAudioSermons()
		await Utils.updateAllMedia(this.mediaImage, 'image_url')
		await Utils.updateAllMedia(this.mediaAudio, 'audio_url')
		const query = Sermon.query()
		if(filter_by_speaker) {
			query.where({ pastor_id: filter_by_speaker })
		}
		if(filter_by_series) {
			query.where({ sermon_series_id: filter_by_series })
		}
		if(filter_by_book) {
			query.where({ book_of_the_bible_id : filter_by_book })
		}

    const { rows: sermons } = await query.with('sermonAudio').with('sermonPastor').with('sermonImage').with('sermonVideo').fetch()
    return {
      status: 'success',
      statusCode: 200,
      message: 'Sermons fetched successfully',
      data: sermons
    }
	}

	async getSermonById(id) {
		return this.sermon.query().where({ id: id }).with('sermonAudio').with('sermonPastor').with('sermonImage').with('sermonVideo').first()
	}

	async getImageById(id) {
		return this.mediaImage.query().where({ id: id }).first()
	}

	async getAudioById(id) {
		return this.mediaAudio.query().where({ id: id }).first()
	}

	async getAllBooksOfTheBible() {
		const { rows: booksOfTheBible } = await BooksOfTheBible.query().fetch()
		return {
			status: 'success',
			data: booksOfTheBible,
			message: 'Successfully fetched all books of the Bible',
			statusCode: 200
		}
	}

	async patchSermon(data, file) {
		const sermonRecord = await this.getSermonById(data.sermon)
		const format = "type/date/slug"
		if(data.bookOfTheBible) {
			sermonRecord.book_of_the_bible_id = data.bookOfTheBible
		}
		if(data.sermonSeries) {
			sermonRecord.sermon_series_id = data.sermonSeries
		}
		await sermonRecord.save()
		if(data.updateOption) {
			switch(data.updateOption) {
				case 'image':
					// Update imageRecord
					const updateSermonImageResponse = await this.updateSermonFile(sermonRecord, format, file, 'Images')
					updateSermonImageResponse.modelRecord.file_name = updateSermonImageResponse.fileName
					updateSermonImageResponse.modelRecord.image_url = updateSermonImageResponse.url
					await updateSermonImageResponse.modelRecord.save()
					return updateSermonImageResponse.modelRecord
				
				case 'audio':
					// Update audioRecord
					const updateSermonAudioResponse = await this.updateSermonFile(sermonRecord, format, file, 'Audio')
					updateSermonAudioResponse.modelRecord.file_name = updateSermonAudioResponse.fileName
					updateSermonAudioResponse.modelRecord.audio_url = updateSermonAudioResponse.url
					await updateSermonAudioResponse.modelRecord.save()
					return updateSermonAudioResponse.modelRecord
				
				case 'video':
					// Update videoRecord
					const videoRecord = await this.mediaVideo.create({
						video_url: data.video_url,
						pastor_id: sermonRecord.pastor_id
					})
					sermonRecord.video_id = videoRecord.id
					await sermonRecord.save()
					return sermonRecord
			}
		}
	}

	async updateSermonFile(sermonRecord, format, file, type) {
		let formatData
		let modelRecord
		let uploadResponse
		// Get Previous Model Record for that sermonRecord, if exists
		switch(type) {
			case 'Images':
				modelRecord = await this.mediaImage.query().where({ id: sermonRecord.image_id }).first()
				break;
			case 'Audio':
				modelRecord = await this.mediaAudio.query().where({ id: sermonRecord.audio_id }).first()
				break;
		}
		// If modelRecord exists, update it
		if(modelRecord !== null) {
			let nameArray = modelRecord.file_name.split("/")
			const indexOfDot = nameArray[nameArray.length - 1].indexOf(".")
			nameArray[nameArray.length - 1] = nameArray[nameArray.length - 1].substring(0, indexOfDot)
			formatData = {
				type: nameArray[0],
				date: nameArray[1],
				slug: nameArray[2]
			}
			uploadResponse = await Utils.uploadFile(file, format, formatData)

			modelRecord.file_name = uploadResponse.fileName
			modelRecord.image_url = uploadResponse.url
			modelRecord.last_updated = new Date()
			await modelRecord.save()
		}
		// If modelRecord does not exist, create it and then update it
		else {
			// If model record is not set, create a new record based on the format
			formatData = {
				type: type,
				date: sermonRecord.date_preached.toISOString().substring(0, 10),
				slug: Utils.generateSlug(sermonRecord.title)
			}
			
			uploadResponse = await Utils.uploadFile(file, format, formatData)

			// Create new model record
			modelRecord = await this.mediaImage.create({
				file_name: uploadResponse.fileName,
				image_url: uploadResponse.url,
				last_updated: new Date(),
				sermon_id: sermonRecord.id
			})
			// Update sermonRecord with new modelRecord
			sermonRecord.image_id = modelRecord.id
			await sermonRecord.save()
		}
		
		return {
			...uploadResponse,
			modelRecord: modelRecord
		}
	}
}

module.exports = SermonService