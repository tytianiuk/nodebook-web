class ContactsAPI {
  async sendMessage(subject: string, content: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/users/message/support',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({ subject, content }),
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
export default new ContactsAPI()
