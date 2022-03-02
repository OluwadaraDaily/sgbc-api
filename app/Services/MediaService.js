'use strict'
const Drive = use('Drive');
const fs = require("fs");
const MediaAudio = use('App/Models/MediaAudio')
const Sermon = use('App/Models/Sermon')
const { differenceInSeconds } = require("date-fns");

class UploadService {
	constructor() {
		this.drive = Drive;
		this.mediaAudio = MediaAudio;
}
	async getAllAudioFiles() {
		let allAudioFiles = await this.mediaAudio.query().where({ is_deleted: false }).fetch()
		allAudioFiles = allAudioFiles.toJSON()
		for(const audioFile of allAudioFiles) {
			const secondsDifference = differenceInSeconds(new Date(), new Date(audioFile.last_updated));
			if (secondsDifference >= 86400) {
				const signedUrl = await this.drive.disk("s3").getSignedUrl(audioFile.file_name, 86400);
				await this.mediaAudio.query().where({ id: audioFile.id }).update({ audio_url: signedUrl, last_updated: new Date() });
			}
		}
		allAudioFiles = await this.mediaAudio.query().where({ is_deleted: false }).fetch()
		return allAudioFiles.toJSON()
	}
}

module.exports = UploadService