'use strict'
const BaseController = use('App/Controllers/Http/BaseController');
const HymnService = use('App/Services/HymnService');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with hymns
 */
class HymnController extends BaseController {
  constructor() {
    super();
    this.hymnService = new HymnService();
  }
  /**
   * Show a list of all hymns.
   * GET hymns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  async fetchHymns({ request, response }) {
    try {
      const { status, statusCode, data, message } = await this.hymnService.fetchHymns()
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Render a form to be used for creating a new hymn.
   * GET hymns/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    return view.render('create-hymn')
  }

  /**
   * Create/save a new hymn.
   * POST hymns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const reqData = request.post()
    const file = request.file('hymn_audio')
    try {
      const { status, data, statusCode, message } = await this.hymnService.storeHymn(reqData, file)
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Display a single hymn.
   * GET hymns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing hymn.
   * GET hymns/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update hymn details.
   * PUT or PATCH hymns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a hymn with id.
   * DELETE hymns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = HymnController
