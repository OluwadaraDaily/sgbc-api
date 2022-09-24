'use strict'
const Drive = use('Drive');
const fs = require("fs");
const News = use('App/Models/News')
const NewsImage = use('App/Models/NewsImage')
const { differenceInSeconds } = require("date-fns");
const Utils = use('App/Services/util/Utils')
const monthsArray = use('App/Services/util/monthsArray');

class NewsService {
  constructor() {
		this.drive = Drive;
		this.news = News;
		this.newsImage = NewsImage;
	}

  async fetchAllNews() {
    await Utils.updateAllMedia(this.newsImage, 'image_url')
    const { rows: allNews } = await this.news.query().with('newsImage').fetch()
    return {
      status: 'success',
      message: "Successfully fetched all news",
      data: allNews,
      statusCode: 200
    }
  }

  async storeNews(data, image) {
    // Upload Image and Store in DB
		const format = "type/date/slug"       //Format in which the file name will appear on Digital Ocean
    const formatData = {
      type: "Images",
      date: `${monthsArray[new Date().getMonth()]}-${new Date().getFullYear()}`,
      slug: Utils.generateSlug(data.title)
    }
    const { url, fileName } = await Utils.uploadFile(image, format, formatData)

    const newsImage = await this.newsImage.create({
      image_url: url,
      file_name: fileName,
      last_updated: new Date()
    })

    // Store News with Image ID
    const news = await this.news.create({
      title: data.title,
      body: data.body,
      news_image_id: newsImage.id
    })

    const newsWithImage = await this.news.query().where({ id: news.id }).with('newsImage').first()
    
    // Return News with Image Obj
    return {
      status: 'success',
      statusCode: 201,
      data: newsWithImage,
      message: 'News record successfully created'
    }
  }
}

module.exports = NewsService