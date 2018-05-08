import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from 'routing-controllers'
import setupDb from './db'
import * as Koa from 'koa'
import {Server} from 'http'
import UserController from './users/controller';
import LoginController from './logins/controller';


const app = new Koa()
const server = new Server(app.callback())
const port = process.env.PORT || 4000

useKoaServer(app, {
  cors: true,
  controllers: [
      UserController,
      LoginController
  ]
})



setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`Listening on port ${port}`)
  })
  .catch(err => console.error('error: ' + err))
