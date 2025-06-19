import type { AuthRequest, AuthResponse } from '../auth-types'
import { LoginService } from '../services/login-service'

import { AuthHandler } from './base-handler'

export class LoginHandler extends AuthHandler {
  private loginService: LoginService

  constructor() {
    super()
    this.loginService = new LoginService()
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    return await this.loginService.execute(request)
  }
}
