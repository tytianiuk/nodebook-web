class AuthAPI {
  async register(email: string, username: string, password: string) {
    console.log({ email, password, username })
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
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }

  async login(username: string, password: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Login')
      return data
    } catch (error) {
      console.error('Error during login:', error)
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
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  }
}

export default new AuthAPI()
