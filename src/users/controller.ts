import { JsonController, Post, Param, Get, Body, Authorized } from 'routing-controllers'
import User from './entity';

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

    return user
  }

}
