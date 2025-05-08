import { httpClient } from '@/patterns/api/api-adapter'

class ContactsAPI {
  async sendMessage(subject: string, content: string) {
    return await httpClient.post('/users/message/support', {
      body: { subject, content },
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactsAPI()
