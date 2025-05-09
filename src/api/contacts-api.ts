import { BaseApi } from './base-api'

import type { ApiResponse } from '@/lib/http-client'

class ContactsAPI extends BaseApi<ContactsAPI> {
  constructor(constructorToken?: symbol) {
    super(constructorToken)
  }

  async sendMessage(
    subject: string,
    content: string,
  ): Promise<ApiResponse<unknown>> {
    return await this.client.post('/users/message/support', {
      body: { subject, content },
    })
  }
}

export default ContactsAPI.getInstance()
