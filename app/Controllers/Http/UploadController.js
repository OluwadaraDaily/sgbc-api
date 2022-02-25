'use strict'
const PastorService = use('App/Services/PastorService');
const UploadService = use('App/Services/UploadService');
const BaseController = use('App/Controllers/Http/BaseController');
const Drive = use('Drive');
const fs = require("fs");

class UploadController extends BaseController {
	constructor() {
    super();
    this.pastorService = new PastorService();
    this.uploadService = new UploadService();
		this.drive = Drive;
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

		try {
			const sermonResponse = await this.uploadService.uploadMedia(data, audioFile)
      return this.success(response, sermonResponse, "Successfully uploaded media", 200)
		} catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
		}
	}
}

module.exports = UploadController
