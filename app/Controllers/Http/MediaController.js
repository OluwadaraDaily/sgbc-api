'use strict'
const BaseController = use('App/Controllers/Http/BaseController');
const MediaService = use('App/Services/MediaService');


class MediaController extends BaseController {
  constructor() {
    super();
		this.mediaService = new MediaService()
  }
	async getAllAudioFiles({ request, response }) {
		try {
			const allAudioFiles = await this.mediaService.getAllAudioFiles()
      return this.success(response, allAudioFiles, "Successfully retrieved all audio files", 200)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}

	}
}

module.exports = MediaController
