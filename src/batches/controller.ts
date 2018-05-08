import { 
    JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
    Body, Patch 
  } from 'routing-controllers'
import User from '../users/entity'
import { Batch, Student} from './entity'

@JsonController()
export default class BatchController {

    @Authorized()
    @Get('/batches/:id([0-9]+)')
    getBatch(
      @Param('id') id: number
    ) {
      return Batch.findOne(id)
    }
  
    @Authorized()
    @Get('/batches')
    getBatches() {
      return Batch.find()
    }
}