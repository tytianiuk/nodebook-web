import type { AuthHandler } from '../handlers/base-handler'
import { LoginHandler } from '../handlers/login-handler'
import { LoginValidationHandler } from '../handlers/login-validation-handler'
import { RegistrationHandler } from '../handlers/registration-handler'
import { RegistrationValidationHandler } from '../handlers/registration-validation-handler'

export class AuthHandlerFactory {
  static createLoginChain(): AuthHandler {
    const validationHandler = new LoginValidationHandler()
    const loginHandler = new LoginHandler()

    validationHandler.setNext(loginHandler)

    return validationHandler
  }

  static createRegistrationChain(): AuthHandler {
    const validationHandler = new RegistrationValidationHandler()
    const registrationHandler = new RegistrationHandler()

    validationHandler.setNext(registrationHandler)

    return validationHandler
  }
}
