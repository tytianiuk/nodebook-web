import ContactsForm from './components/contacts-form'
import ContactInfo from './components/contacts-info'

const ContactsPage = () => {
  return (
    <div className='bg-white text-black flex justify-center'>
      <div className='px-4 py-12 w-1/2'>
        <h2 className='text-2xl font-semibold text-center md:text-left'>
          {"Зв'яжіться з нами"}
        </h2>
        <ContactInfo />
        <h2 className='mb-8 text-2xl font-semibold text-center md:text-left'>
          {'Напишіть електронного листа'}
        </h2>
        <ContactsForm />
      </div>
    </div>
  )
}

export default ContactsPage
