import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const validatorData = await request.validate(RegisterValidator)
    const user = await User.create(validatorData)

    const token = await auth.login(user)
    return response.status(201).json({ user, token })
  }
}
