### **Chain of Responsibility Pattern**⛓️ | [chain-of-responsibility директорія з кодом](../../src/patterns/chain-of-responsibility/)

## Контекст проблеми 📝

У системах автентифікації часто виникає потреба в послідовній обробці запитів: валідація даних, перевірка облікових даних, завантаження профілю користувача, перевірка прав доступу тощо. Кожен етап має свою логіку, але їх потрібно виконувати в певній послідовності, з можливістю переривання процесу на будь-якому етапі.

## Причина використання патерну Chain of Responsibility 🤔

Chain of Responsibility дозволяє передавати запити вздовж ланцюжка обробників. Кожен обробник вирішує, чи обробляти запит, чи передати його далі по ланцюжку. Це допомагає розділити відповідальність між різними компонентами та зробити систему більш модульною та гнучкою.

## Переваги використання ✅

- **Розділення відповідальності**: кожен обробник відповідає за конкретну задачу
- **Гнучкість**: легко змінювати порядок обробників або додавати нові
- **Розширюваність**: можна додавати нові обробники без зміни існуючого коду
- **Зменшення зв'язності**: обробники не знають про існування інших обробників
- **Чистий код**: логіка обробки запитів стає більш структурованою та зрозумілою

## Недоліки використання ⚠️

- **Гарантія обробки**: немає гарантії, що запит буде оброблено
- **Складність відлагодження**: може бути складно відстежити шлях запиту через ланцюжок
- **Надмірність**: для простих випадків може бути надмірним
- **Продуктивність**: проходження через довгий ланцюжок може вплинути на продуктивність

## Опис реалізації 🔧

Реалізація складається з:

1. `AuthHandler` — абстрактний базовий клас для всіх обробників у ланцюгу.
2. Конкретні обробники:

3. `ValidationHandler` — перевіряє правильність введених даних
4. `AuthenticationHandler` — виконує автентифікацію або реєстрацію

5. `AuthChain` — клас, який створює та налаштовує ланцюг обробників.

Кожен обробник має метод `handle`, який обробляє запит і вирішує, чи передавати його далі.

## Кодова реалізація 💻

### 🔗 Базовий обробник та інтерфейси

`auth-types.ts`

```typescript
export interface AuthRequest {
  email: string
  password: string
  username?: string
  confirmPassword?: string
  [key: string]: any
}

export interface AuthResponse {
  success: boolean
  user?: any
  error?: string
  data?: any
}
```

`base-handler.ts`

```typescript
export abstract class AuthHandler {
  private nextHandler: AuthHandler | null = null

  public setNext(handler: AuthHandler): AuthHandler {
    this.nextHandler = handler
    return handler
  }

  public async handleNext(request: AuthRequest): Promise<AuthResponse> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }

    return { success: true }
  }

  public abstract handle(request: AuthRequest): Promise<AuthResponse>
}
```

### 🔍 Приклад конкретного обробника

`validation-handler.ts`

```typescript
export class ValidationHandler extends AuthHandler {
  private isRegistration: boolean

  constructor(isRegistration: boolean) {
    super()
    this.isRegistration = isRegistration
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    try {
      if (this.isRegistration) {
        registerSchema.parse(request)
      } else {
        if (!request.email || !request.password) {
          return { success: false, error: 'Заповніть усі поля' }
        }
      }

      return this.handleNext(request)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(', ')
        return {
          success: false,
          error: `Помилка валідації: ${fieldErrors}`,
        }
      }

      return {
        success: false,
        error: 'Невідома помилка валідації',
      }
    }
  }
}
```

### 🔗 Клас для створення ланцюга

`auth-chain.ts`

```typescript
import type {
  AuthHandler,
  AuthRequest,
  AuthResponse,
} from './handlers/base-handler'
import { ValidationHandler } from './handlers/validation-handler'
import { AuthenticationHandler } from './handlers/authentication-handler'

export class AuthChain {
  private firstHandler: AuthHandler

  constructor(isRegistration: boolean) {
    const validationHandler = new ValidationHandler(isRegistration)
    const authenticationHandler = new AuthenticationHandler(isRegistration)

    validationHandler.setNext(authenticationHandler)

    this.firstHandler = validationHandler
  }

  public async process(request: AuthRequest): Promise<AuthResponse> {
    return this.firstHandler.handle(request)
  }
}
```

### 🔄 Використання в компонентах

`sign-in-form.tsx` (фрагмент)

```tsx
const handleLogin = async (data: LoginFormValues) => {
  const authChain = new AuthChain(false)
  const response = await authChain.process(data)

  if (response.success && response.user) {
    setUser(response.user)
    router.replace(Routes.CATALOG)
  } else if (response.error) {
    toast({
      title: 'Помилка при вході',
      description: response.error,
      variant: 'destructive',
    })
  }
}
```
