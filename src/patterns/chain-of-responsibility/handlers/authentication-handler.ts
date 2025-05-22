import { AuthRequest, AuthResponse } from '../auth-types'

import { AuthHandler } from './base-handler'

import AuthAPI from '@/api/auth-api'

export class AuthenticationHandler extends AuthHandler {
  private isRegistration: boolean

  constructor(isRegistration: boolean) {
    super()
    this.isRegistration = isRegistration
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    try {
      if (this.isRegistration) {
        const { username, email, password } = request

        const res = await AuthAPI.register(username!, email, password)

        if (res.status !== 201) {
          return {
            success: false,
            error: 'Не вдалося зареєструвати користувача',
          }
        }

        const loginResponse = await AuthAPI.login(email, password)
        const userResponse = await AuthAPI.getMe()

        return {
          success: true,
          user: userResponse.data,
          data: { registrationResponse: res, loginResponse },
        }
      } else {
        const { email, password } = request
        await AuthAPI.login(email, password)
        const response = await AuthAPI.getMe()

        return {
          success: true,
          user: response.data,
        }
      }
    } catch {
      return {
        success: false,
        error: this.isRegistration
          ? 'До цієї пошти вже прив`язаний обліковий запис'
          : 'Пароль або пошта введені не правильно. Можливо цього профілю не існує.',
      }
    }
  }
}
