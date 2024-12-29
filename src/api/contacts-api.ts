import { api } from 'nodebook-api'

import env from '@/lib/env'

class ContactsAPI {
  async sendMessage(subject: string, content: string) {
    return await api.post('/users/message/support', {
      baseURL: env.API_URL,
      body: { subject, content },
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactsAPI()
