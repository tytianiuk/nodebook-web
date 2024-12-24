class CategoriesAPI {
  async getAllCategories() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/categories',
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
      console.error('Error fetching categories:', error)
      throw error
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesAPI()
