import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from 'routing-controllers'
import User from './users/entity'
import setupDb from './db'
import * as Koa from 'koa'
import {Server} from 'http'
import UserController from './users/controller'
import LoginController from './logins/controller'
import BatchController from './batches/controller'
import { verify,secret } from './jwt'
import StudentController from './students/controller';
import GradesController from './grades/controller';


const app = new Koa()
const server = new Server(app.callback())
const port = process.env.PORT || 4000

useKoaServer(app, {
  cors: true,
  controllers: [
      UserController,
      LoginController,
      BatchController,
      StudentController,
      GradesController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOne(id)
      }
    }
    return undefined
  }
})



setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`iValuate Server Listening Port: ${port}`)
  })
  .catch(err => console.error('error: ' + err))
