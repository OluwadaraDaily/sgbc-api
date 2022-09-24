'use strict'
const BaseController = use('App/Controllers/Http/BaseController');
const PodcastService = use('App/Services/PodcastService');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with podcasts
 */
class PodcastController extends BaseController {

  constructor(){
    super()
    this.podcastService = new PodcastService()
  }

  /**
   * Show a list of all podcasts.
   * GET podcasts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  async fetchAllPodcasts({ request, response }) {
    try {
      const { data, message, statusCode } = await this.podcastService.fetchAllPodcasts()
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Render a form to be used for creating a new podcast.
   * GET podcasts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    return view.render('create-podcast')
  }

  /**
   * Create/save a new podcast.
   * POST podcasts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const reqData = request.post()
    const audioFile = request.file('podcast_audio')
    const imageFile = request.file('podcast_image')
    try {
      const { data, message, statusCode } = await this.podcastService.storePodcast(reqData, audioFile, imageFile)
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Display a single podcast.
   * GET podcasts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing podcast.
   * GET podcasts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update podcast details.
   * PUT or PATCH podcasts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a podcast with id.
   * DELETE podcasts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PodcastController
