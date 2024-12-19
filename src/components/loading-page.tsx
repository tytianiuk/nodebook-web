import { Loader2 } from 'lucide-react'

const LoadingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <Loader2 className='w-12 h-12 text-primary animate-spin' />
      <h2 className='mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
        Завантаження...
      </h2>
      <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
        Будь ласка, зачекайте, поки ми готуємо все для вас
      </p>
    </div>
  )
}

export default LoadingPage
