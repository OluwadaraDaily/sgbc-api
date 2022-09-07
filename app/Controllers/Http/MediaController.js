'use strict'

const BaseController = use('App/Controllers/Http/BaseController');
const MediaService = use('App/Services/MediaService');


class MediaController extends BaseController {
  constructor() {
    super();
		this.mediaService = new MediaService()
  }
	async getAllSermons({ request, response }) {
		try {
			const allSermons = await this.mediaService.getAllSermons()
			return this.success(response, allSermons, "Successfully retrieved all sermons", 200)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}
	}
	async getAllAudioSermons({ request, response }) {
		try {
			const allAudioFiles = await this.mediaService.getAllAudioSermons()
      return this.success(response, allAudioFiles, "Successfully retrieved all audio files", 200)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}

	}

	async listOfAllSermons({ view }) {
		const sermons = await this.mediaService.getAllSermons()
		return view.render('all-sermons', {
			sermons
		})
	}
}

module.exports = MediaController
