'use strict'
const BaseController = use('App/Controllers/Http/BaseController');
const NewsService = use('App/Services/NewsService');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with news
 */
class NewsController extends BaseController {

  constructor(){
    super()
    this.newsService = new NewsService()
  }
  /**
   * List all news
   * GET news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { data } = await this.newsService.fetchAllNews()
    return view.render('list-news', {
      news: data
    })
  }

  /**
   * Fetch all news
   * GET news
   */

  async fetchAllNews({ request, response }) {
    try {
      const { data, message, statusCode } = await this.newsService.fetchAllNews()
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Render a form to be used for creating a new news.
   * GET news/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('create-news')
  }

  /**
   * Create/save a new news.
   * POST news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const reqData = request.post()
    const file = request.file('news_image')
    try {
      const { status, data, message, statusCode } = await this.newsService.storeNews(reqData, file)
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Display a single news.
   * GET news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing news.
   * GET news/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const newsItem = await this.newsService.getNews(params.id)
    return view.render('edit-news', {
      news: newsItem,
      newsImage: newsItem.toJSON().newsImage
    })
  }

  /**
   * Update news details.
   * PUT or PATCH news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const reqData = request.post()
    const file = request.file('news_image')
    try {
      const { status, data, message, statusCode } = await this.newsService.updateNews(reqData.id, reqData, file)
      if(status === 'error') {
        return this.error(response, message, [], statusCode);
      }
      return this.success(response, data, message, statusCode)
    } catch (error) {
      return this.error(response, 'There was a problem, please try again later.', [], 500);
    }
  }

  /**
   * Delete a news with id.
   * DELETE news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = NewsController
