'use strict'

const BaseController = use('App/Controllers/Http/BaseController');
const SermonService = use('App/Services/SermonService');


class SermonController extends BaseController {
  constructor() {
    super();
		this.sermonService = new SermonService()
  }

	async getAllSermons({ request, response }) {
		const { filter_by_speaker, filter_by_series, filter_by_book } = request.get()
		try {
			const { data, statusCode, message, status } = await this.sermonService.getAllSermons({ filter_by_speaker, filter_by_series, filter_by_book })
			return this.success(response, data, message, statusCode)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}
	}
	async getAllAudioSermons({ request, response }) {
		try {
			const allAudioFiles = await this.sermonService.getAllAudioSermons()
      return this.success(response, allAudioFiles, "Successfully retrieved all audio files", 200)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}

	}

	async listOfAllSermons({ view }) {
		const { data: sermons } = await this.sermonService.getAllSermons({})
		return view.render('all-sermons', {
			sermons
		})
	}

	async getAllBooksOfTheBible({ request, response }) {
		try {
			const { data, statusCode, message, status } = await this.sermonService.getAllBooksOfTheBible()
			return this.success(response, data, message, statusCode)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}
	}

	async updateSermon({ request, params, response }) {
		const reqData = request.post()
		try {
			const { data, statusCode, message, status } = await this.sermonService.updateSermon(params.id, reqData)
			return this.success(response, data, message, statusCode)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}
	}
}

module.exports = SermonController
