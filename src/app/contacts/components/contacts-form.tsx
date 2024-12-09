import { Button } from '@/components/ui/button'
import { formItems } from '@/constants/form-items'

const ContactsForm = () => {
  return (
    <form className='w-full space-y-6' role='form'>
      {formItems.map(({ id, label, component: Component }) => {
        return (
          <div key={id}>
            <label htmlFor={id} className='block mb-2 text-sm font-medium'>
              {label}
            </label>
            <Component id={id} />
          </div>
        )
      })}
      <Button
        type='submit'
        className='w-full bg-black text-white hover:bg-gray-800'
      >
        Відправити
      </Button>
    </form>
  )
}
export default ContactsForm
