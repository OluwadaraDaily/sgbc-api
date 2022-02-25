'use strict'
const PastorService = use('App/Services/PastorService');
const BaseController = use('App/Controllers/Http/BaseController');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pastors
 */
class PastorController extends BaseController {
  constructor() {
    super();
    this.pastorService = new PastorService();
  }

  /**
   * Show a list of all pastors.
   * GET pastors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const pastors = await this.pastorService.fetchPastors()
      return this.success(response, pastors, "Successfully fetched pastors", 200)
      
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', 500);
    }
  }

  /**
   * Render a form to be used for creating a new pastor.
   * GET pastors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new pastor.
   * POST pastors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single pastor.
   * GET pastors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pastor.
   * GET pastors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pastor details.
   * PUT or PATCH pastors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pastor with id.
   * DELETE pastors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PastorController
