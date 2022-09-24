'use strict'
const Podcast = use('App/Models/Podcast')
const PodcastAudio = use('App/Models/PodcastAudio')
const PodcastImage = use('App/Models/PodcastImage')
const { differenceInSeconds } = require("date-fns");
const Utils = use('App/Services/util/Utils')
const monthsArray = use('App/Services/util/monthsArray');
const Drive = use('Drive');


class PodcastService {
  constructor() {
    this.podcast = Podcast
    this.podcastAudio = PodcastAudio
    this.podcastImage = PodcastImage
  }
  async fetchAllPodcasts() {
    await Utils.updateAllMedia(this.podcastImage, 'image_url')
    await Utils.updateAllMedia(this.podcastAudio, 'audio_url')
    const { rows: allPodcasts } = await this.podcast.query().with('podcastImage').with('podcastAudio').fetch()
    return {
      status: 'success',
      message: "Successfully fetched all news",
      data: allPodcasts,
      statusCode: 200
    }
  }

	async storePodcast(data, audio, image) {
     // Upload Image and Store in DB
		const format = "type/date/slug"       //Format in which the file name will appear on Digital Ocean
    const imageFormatData = {
      type: "Images",
      date: `${monthsArray[new Date(data.date_recorded).getMonth()]}-${new Date().getFullYear()}`,
      slug: Utils.generateSlug(data.title)
    }
    const audioFormatData = {
      type: "Audio",
      date: `${monthsArray[new Date(data.date_recorded).getMonth()]}-${new Date().getFullYear()}`,
      slug: Utils.generateSlug(data.title)
    }
    const { url: imageUrl, fileName: imageFileName } = await Utils.uploadFile(image, format, imageFormatData)

    const { url: audioUrl, fileName: audioFileName } = await Utils.uploadFile(audio, format, audioFormatData)

    const podcastImage = await this.podcastImage.create({
      image_url: imageUrl,
      file_name: imageFileName,
      last_updated: new Date()
    })

    const podcastAudio = await this.podcastAudio.create({
      audio_url: audioUrl,
      file_name: audioFileName,
      last_updated: new Date()
    })

    // Store Podcast with Media
    const podcast = await this.podcast.create({
      title: data.title,
      episode_number: Number(data.episode_number),
      date_recorded: new Date(data.date_recorded),
      podcast_image_id: podcastImage.id,
      podcast_audio_id: podcastAudio.id
    })

    const podcastWithMedia = await this.podcast.query().where({ id: podcast.id }).with('podcastImage').with('podcastAudio').first()
    
    // Return Podcast with Media
    return {
      status: 'success',
      statusCode: 201,
      data: podcastWithMedia,
      message: 'Podcast record successfully created'
    }


  }
}

module.exports = PodcastService