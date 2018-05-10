import { JsonController, Post, Body } from 'routing-controllers'
import User from './entity';
import {sign} from '../jwt'

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() data: User
  ) {
    const {password, ...rest} = data
    const entity = User.create(rest)
    await entity.setPassword(password)

    const user = await entity.save()

    const jwt = sign({ id: user.id! })
    return { jwt }
  }

}
