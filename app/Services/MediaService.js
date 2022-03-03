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
		this.sermon = Sermon;
}
	async getAllAudioSermons() {
		let allAudioSermons = await this.sermon.query().whereNotNull('audio_id').with('sermonAudio').fetch()
		let allAudioFiles = allAudioSermons.toJSON()

		for(const audioFile of allAudioFiles) {
			const secondsDifference = differenceInSeconds(new Date(), new Date(audioFile.sermonAudio.last_updated));
			if (secondsDifference >= 86400) {
				const signedUrl = await this.drive.disk("s3").getSignedUrl(audioFile.sermonAudio.file_name, 86400);
				await this.mediaAudio.query().where({ id: audioFile.sermonAudio.id }).update({ audio_url: signedUrl, last_updated: new Date() });
			}
		}
		allAudioSermons = await this.sermon.query().whereNotNull('audio_id').with('sermonAudio').with('sermonPastor').fetch()
		return allAudioSermons.toJSON()
	}
}

module.exports = UploadService