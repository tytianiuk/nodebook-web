import type { FormFieldFactory, FormField } from './form-field-interfaces'
import { IconEmailFormField } from './form-fields/icon-email-form-field'
import { IconPasswordFormField } from './form-fields/icon-password-form-field'
import { IconUserNameField } from './form-fields/icon-username-form-field'

export class IconFormFieldFactory implements FormFieldFactory {
  createUserNameField(): FormField {
    return new IconUserNameField()
  }

  createEmailField(): FormField {
    return new IconEmailFormField()
  }

  createPasswordField(): FormField {
    return new IconPasswordFormField()
  }
}
