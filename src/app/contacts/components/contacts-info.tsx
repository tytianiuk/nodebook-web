import { Mail, MapPin, Phone } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ContactsInfo = () => {
  return (
    <Card className='my-8'>
      <CardHeader>
        <CardTitle>Наші контакти</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2' role='img'>
          <MapPin className='h-5 w-5 text-muted-foreground' />
          <p>вул. Книжкова, 123, м. Київ, 01001</p>
        </div>
        <div className='flex items-center space-x-2' role='img'>
          <Phone className='h-5 w-5 text-muted-foreground' />
          <p>+38 (044) 123-45-67</p>
        </div>
        <div className='flex items-center space-x-2' role='img'>
          <Mail className='h-5 w-5 text-muted-foreground' />
          <p>info@nodebook.com</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactsInfo
