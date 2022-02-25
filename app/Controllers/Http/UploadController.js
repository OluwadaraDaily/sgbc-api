'use strict'
const PastorService = use('App/Services/PastorService');
const BaseController = use('App/Controllers/Http/BaseController');
const Drive = use('Drive');
const fs = require("fs");

class UploadController extends BaseController {
	constructor() {
    super();
    this.pastorService = new PastorService();
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

		console.log("DATA: ", data)
		
		const slug = data.title.replace(/\s+/g, '-')
		const file = fs.readFileSync(audioFile.tmpPath);
		const fileName = `${slug}/${data.date_preached}.${audioFile.extname}`
		console.log("FILENAME: ", fileName)
		await this.drive.disk('s3').put(fileName, file);
		const audio_url = await this.drive.disk('s3').getSignedUrl(fileName, 86400)

		console.log("URL: ", audio_url)
	}
}

module.exports = UploadController
