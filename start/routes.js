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
Route.get('/sermon/update', 'UploadController.updateSermonView')
Route.post('/sermon/update', 'UploadController.patchSermon').as('patchSermon')

// Media Controller
Route.get('/media/audios', 'MediaController.getAllAudioSermons')

// Pastor Controller
Route.get('/pastors/create', 'PastorController.create')
Route.post('/pastors', 'PastorController.store').as('storePastor')
