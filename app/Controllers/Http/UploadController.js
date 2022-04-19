'use strict'
const PastorService = use('App/Services/PastorService');
const MediaService = use('App/Services/MediaService');
const UploadService = use('App/Services/UploadService');
const BaseController = use('App/Controllers/Http/BaseController');

class UploadController extends BaseController {
	constructor() {
    super();
    this.pastorService = new PastorService();
    this.uploadService = new UploadService();
    this.mediaService = new MediaService();
  }
  async index({ view }) {
		const pastors = await this.pastorService.fetchPastors()
		return view.render('upload-media.edge', {
			title: "Upload Page",
			pastors: pastors
		})
	}

	async store({ request, response }) {
		const data = request.post()
		const audioFile = request.file('audio_file')
		const imageFile = request.file('image_file')

		try {
			const sermonResponse = await this.uploadService.uploadMedia(data, audioFile, imageFile)
			if(sermonResponse.status === "error") {
				return this.error(response, sermonResponse.message, [], 500)
			}
      return this.success(response, sermonResponse.data, "Successfully uploaded media", 200)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', error, 500);
		}
	}

	async updateSermonView({ view }) {
		try {
			const sermons = await this.mediaService.getAllSermons()
			return view.render('update-sermon.edge', {
				title: "Update Sermon",
				sermons: sermons
			})	
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', error, 500);
		}
	}

	async patchSermon({ request, response }) {
		try {

			const file = request.file('file')
			const data = request.post()
			
			const patchSermonResponse = await this.mediaService.patchSermon(data, file)

			return this.success(response, patchSermonResponse, "Successfully updated sermon", 200)
			
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', error, 500);
		}
	}
}

module.exports = UploadController
