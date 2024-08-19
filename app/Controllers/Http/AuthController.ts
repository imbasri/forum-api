import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      console.log("🚀 ~ AuthController ~ register ~ auth:", auth)
      const validatorData = await request.validate(RegisterValidator)
      const user = await User.create(validatorData)

      const token = await auth.login(user)
      return response.status(201).json({ user, token })
    } catch (error) {
      return response.status(500).json({
        message: error.message
      })
    }
  }

  public async login ({ auth, request, response }: HttpContextContract) {
    const {email, password} = request.all()

    try {
      const token = await auth.attempt(email, password)
      return response.json({
        user:token.user,
        token:token.token
      })
    } catch (error) {
      return response.status(401).json({
        message: error.message
      })
    }
  }
}
