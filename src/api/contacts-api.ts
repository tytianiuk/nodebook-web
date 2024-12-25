import api from '@/lib/api'

class ContactsAPI {
  async sendMessage(subject: string, content: string) {
    return await api.post('/users/message/support', {
      body: { subject, content },
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactsAPI()
