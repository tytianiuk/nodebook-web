import type { FormFieldFactory, FormField } from './form-field-interfaces'
import { EmailFormField } from './form-fields/email-form-field'
import { PasswordFormField } from './form-fields/password-form-field'
import { UserNameField } from './form-fields/username-form-field'

export class DefaultFormFieldFactory implements FormFieldFactory {
  createUserNameField(): FormField {
    return new UserNameField()
  }

  createEmailField(): FormField {
    return new EmailFormField()
  }

  createPasswordField(): FormField {
    return new PasswordFormField()
  }
}
