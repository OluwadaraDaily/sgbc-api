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

// Media Controller
Route.get('/sermons', 'MediaController.listOfAllSermons')
Route.get('/sermons/all', 'MediaController.getAllSermons')
Route.get('/media/audios', 'MediaController.getAllAudioSermons')

// Pastor Controller
Route.get('/pastors/create', 'PastorController.create')
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