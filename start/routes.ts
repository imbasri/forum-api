/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')

  // Route.get('/threads', 'ThreadsController.index')
  // Route.post('/threads', 'ThreadsController.store').middleware('auth')
  // Route.get('/threads/:id', 'ThreadsController.show')
  // Route.put('/threads/:id', 'ThreadsController.update').middleware('auth')
  // Route.delete('/threads/:id', 'ThreadsController.destroy').middleware('auth')

  // Route.post('/threads/:thread_id/replies', 'RepliesController.store').middleware('auth')

  // refactory routes menggunakan resource
  Route.resource('/threads', 'ThreadsController').apiOnly().middleware({
    store: 'auth',
    update: 'auth',
    destroy: 'auth',
  })
  Route.resource('/threads.replies', 'RepliesController').only(['store']).middleware({
    store: 'auth',
  })

}).prefix('/api')
