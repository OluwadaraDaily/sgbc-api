'use strict'
const BaseController = use('App/Controllers/Http/BaseController');
const LagosBibleConferenceService = use('App/Services/LagosBibleConferenceService');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with lagosbibleconference2022s
 */
class LagosBibleConference2022Controller extends BaseController {

  constructor() {
    super();
		this.lbcService = new LagosBibleConferenceService()
  }

  /**
   * Show a list of all lagosbibleconference2022s.
   * GET lagosbibleconference2022s
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new lagosbibleconference2022.
   * GET lagosbibleconference2022s/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new lagosbibleconference2022.
   * POST lagosbibleconference2022s
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const requestData = request.post()
    try {
      const { data, message, statusCode } = await this.lbcService.storePersonnelInfo(requestData)
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', error, 500);
    }
  }

  /**
   * Display a single lagosbibleconference2022.
   * GET lagosbibleconference2022s/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing lagosbibleconference2022.
   * GET lagosbibleconference2022s/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update lagosbibleconference2022 details.
   * PUT or PATCH lagosbibleconference2022s/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a lagosbibleconference2022 with id.
   * DELETE lagosbibleconference2022s/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LagosBibleConference2022Controller
