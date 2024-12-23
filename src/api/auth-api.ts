class AuthAPI {
  async register(username: string, email: string, password: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, username }),
          credentials: 'include',
        },
      )

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: any = new Error(`Error status: ${response.status}`)
        error.status = response.status
        throw error
      }

      return response
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        },
      )

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: any = new Error(`Error status: ${response.status}`)
        error.status = response.status
        throw error
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  async getMe() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/users/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )

      if (!response.ok) {
        if (response.status === 403) {
          return null
        }
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI()
