class ProfileAPI {
  async logout() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/auth/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
      throw error
    }
  }

  async getLikedBooks() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/books/liked',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
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
  async changePassword(password: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/users/me',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
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
      throw error
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileAPI()
