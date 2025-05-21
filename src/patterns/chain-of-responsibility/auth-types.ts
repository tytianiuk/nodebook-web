/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthRequest {
  email: string
  password: string
  username?: string
  confirmPassword?: string
  [key: string]: any
}

export interface AuthResponse {
  success: boolean
  user?: any
  error?: string
  data?: any
}
