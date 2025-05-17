'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import useUserStore from '@/hooks/store/use-user-store'
import { interactionContext } from '@/patterns/strategy/book-interaction-strategies'

interface BookCommentsFormProps {
  bookId: string
}

const BookCommentsForm = ({
  bookId,
  updateBook,
}: BookCommentsFormProps & { updateBook: () => void }) => {
  const { user } = useUserStore()

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { content: '' },
  })

  const allFields = watch()
  const allFieldsFilled = allFields.content.trim() !== ''

  const onSubmit = async (data: { content: string }) => {
    try {
      await interactionContext.executeStrategy('comment', bookId, data)

      updateBook()
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
      <Controller
        name='content'
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder='Напишіть свій коментар...'
            className='mb-2 h-[100px]'
          />
        )}
      />
      <Button
        type='submit'
        disabled={!allFieldsFilled}
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Відправляється...' : 'Додати коментар'}
      </Button>
    </form>
  )
}

export default BookCommentsForm
