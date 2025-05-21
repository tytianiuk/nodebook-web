/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthRequest, AuthResponse } from '../auth-types'

export abstract class AuthHandler {
  private nextHandler: AuthHandler | null = null

  public setNext(handler: AuthHandler): AuthHandler {
    this.nextHandler = handler
    return handler
  }

  public async handleNext(request: AuthRequest): Promise<AuthResponse> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }

    return { success: true }
  }

  public abstract handle(request: AuthRequest): Promise<AuthResponse>
}
