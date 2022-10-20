'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
Route.get('/', () => {
	return { message: "Welcome to the SGBC API v1" }
})
// Upload Controller
Route.get('/upload', 'UploadController.index')
Route.post('/upload', 'UploadController.store').as('upload')
// Route.get('/sermons/update', 'UploadController.updateSermonView')
Route.get('/sermons/:id/update', 'UploadController.updateSermonView')
Route.post('/sermons/update', 'UploadController.patchSermon').as('patchSermon')

// SermonController
Route.get('/sermons', 'SermonController.listOfAllSermons')
Route.get('/sermons/all', 'SermonController.getAllSermons')
Route.get('/media/audios', 'SermonController.getAllAudioSermons')
Route.get('/bible/books', 'SermonController.getAllBooksOfTheBible')
Route.patch("sermons/:id", 'SermonController.updateSermon')


// Pastor Controller
Route.get('/pastors/create', 'PastorController.create')
Route.get('/pastors', 'PastorController.index')
Route.post('/pastors', 'PastorController.store').as('storePastor')

// LBC Controller
Route.post('/lbc/2022', 'LagosBibleConference2022Controller.store').validator(['LBCForm'])

// News Controller
Route.get('/news/create', 'NewsController.create')
Route.get('/news', 'NewsController.fetchAllNews')
Route.post('/news', 'NewsController.store').as('storeNews')
Route.get('/news/all', 'NewsController.index')
Route.get('/news/:id/edit', 'NewsController.edit')
Route.post('/news/update', 'NewsController.update').as('patchNews')

// Podcast Controller
Route.get('/podcasts', 'PodcastController.fetchAllPodcasts')
Route.get('/podcasts/create', 'PodcastController.create')
Route.post('/podcasts', 'PodcastController.store').as('storePodcast')

// Hymn Controller
Route.get('/hymns', 'HymnController.fetchHymns')
Route.get('/hymns/create', 'HymnController.create')
Route.post('/hymns', 'HymnController.store').as('storeHymn')