import ContactsForm from './components/contacts-form'

const ContactsPage = () => {
  return (
    <div className='bg-white text-black flex justify-center'>
      <div className='px-4 py-12 w-1/2'>
        <h2 className='mb-8 text-2xl font-semibold'>{"Зв'яжіться з нами"}</h2>
        <ContactsForm />
      </div>
    </div>
  )
}

export default ContactsPage
