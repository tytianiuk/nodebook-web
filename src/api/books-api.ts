class BooksAPI {
  async getAllBooks() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        next: { revalidate: 360 },
      })

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: any = new Error(`Error status: ${response.status}`)
        error.status = response.status
        throw error
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching books:', error)
      throw error
    }
  }

  async getBookById(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          next: { revalidate: 360 },
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
      console.error('Error fetching book:', error)
      throw error
    }
  }

  async addReview(
    bookId: string,
    review: { userId: string; comment: string; rating: number },
  ) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}/review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(review),
          cache: 'no-store',
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
      console.error('Error adding review:', error)
      throw error
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BooksAPI()
