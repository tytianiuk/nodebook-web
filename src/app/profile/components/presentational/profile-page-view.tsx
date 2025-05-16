import FavoriteBooksContainer from '../containers/favorite-books-container'
import ProfileCardContainer from '../containers/profile-card-container'
import SecurityFormContainer from '../containers/security-form-container'

import { Accordion } from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { User } from '@/types/user'

interface ProfilePageViewProps {
  user: User | null
}

const ProfilePageView = ({ user }: ProfilePageViewProps) => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <ProfileCardContainer user={user} />
        <Card className='w-full lg:w-2/3'>
          <CardHeader>
            <CardTitle>Ваш профіль</CardTitle>
            <CardDescription>
              Керуйте своїми особистими даними та переглядайте свої вподобайки
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <Accordion type='single' collapsible className='w-full'>
                <SecurityFormContainer />
                <FavoriteBooksContainer />
              </Accordion>
            ) : (
              <div className='space-y-4'>
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-12 w-full' />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePageView
