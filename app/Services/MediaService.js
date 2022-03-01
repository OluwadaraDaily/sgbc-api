'use strict'
const Drive = use('Drive');
const fs = require("fs");
const MediaAudio = use('App/Models/MediaAudio')
const Sermon = use('App/Models/Sermon')

class UploadService {
	async getAllAudioFiles() {
		const allAudioFiles = await MediaAudio.all()
		return allAudioFiles.toJSON()
	}
}

module.exports = UploadService