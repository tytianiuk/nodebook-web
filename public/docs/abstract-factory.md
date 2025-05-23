### **Abstract Factory Pattern**🏭 | [abstract-factory директорія з кодом](../../src/patterns/abstract-factory/)

## Контекст проблеми 📝

При розробці форм у веб-додатках часто виникає потреба створювати різні типи полів вводу (текстові поля, поля для паролів, електронної пошти тощо) з різними варіантами відображення (звичайні поля, поля з іконками, поля з додатковими функціями). Кожне поле має свою специфіку, але повинно відповідати єдиному інтерфейсу для спрощення роботи з формами.

## Причина використання патерну Abstract Factory 🤔

Abstract Factory дозволяє створювати сімейства пов'язаних об'єктів без прив'язки до конкретних класів. Це дає можливість створювати різні варіанти полів форми (звичайні та з іконками в нашому випадку) через єдиний інтерфейс, що спрощує заміну одного варіанту на інший без зміни коду, який використовує ці поля.

## Переваги використання ✅

- **Інкапсуляція створення об'єктів**: клієнтський код не залежить від конкретних класів полів форми
- **Заміна сімейств об'єктів**: можна легко замінити одну фабрику на іншу
- **Розширюваність**: легко додавати нові типи полів або нові фабрики

## Недоліки використання ⚠️

- **Складність**: додає додатковий рівень абстракції, що може ускладнити код
- **Надмірність**: для простих випадків може бути надмірним
- **Збільшення кількості класів**: потребує створення багатьох інтерфейсів і класів

## Опис реалізації 🔧

Реалізація складається з:

1. `FormField` — інтерфейс для всіх полів форми
2. `FormFieldFactory` — інтерфейс фабрики, що визначає методи для створення різних типів полів
3. Конкретні фабрики:

- `DefaultFormFieldFactory` — створює звичайні поля форми
- `IconFormFieldFactory` — створює поля форми з іконками

6. Конкретні продукти:

- Звичайні поля: `UserNameField`, `EmailFormField`, `PasswordFormField`
- Поля з іконками: `IconUserNameField`, `IconEmailFormField`, `IconPasswordFormField`

Кожна фабрика створює свій набір полів, які відповідають єдиному інтерфейсу `FormField`.

## Кодова реалізація 💻

### 🔗 Інтерфейси

`form-field-interfaces.ts`

```typescript
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface FormField {
  render: (props: FormFieldProps) => JSX.Element
}

export interface FormFieldProps {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  registration: UseFormRegisterReturn
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export interface FormFieldFactory {
  createUserNameField(): FormField
  createEmailField(): FormField
  createPasswordField(): FormField
}
```

### 🏭 Фабрики

`form-field-factory.ts`

```typescript
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
```

`icon-form-field-factory.ts`

```typescript
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
```

### 🔍 Приклад конкретного продукту

`email-form-field.tsx`

```typescript
export class EmailFormField implements FormField {
  render({
    id = 'email',
    label = 'Пошта',
    placeholder = 'your@email.com',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <Input
        label={label}
        id={id}
        type='email'
        placeholder={placeholder}
        error={error}
        {...registration}
        {...inputProps}
      />
    )
  }
}
```

`icon-email-form-field.tsx`

```typescript
export class IconEmailFormField implements FormField {
  render({
    id = 'email',
    label = 'Пошта',
    placeholder = 'your@email.com',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <IconInput
        icon={<Mail className="h-4 w-4 text-muted-foreground" />}
        label={label}
        id={id}
        type='email'
        placeholder={placeholder}
        error={error}
        {...registration}
        {...inputProps}
      />
    )
  }
}
```

### 🔄 Використання в компонентах

`sign-in-form.tsx` (фрагмент)

```tsx
// Використання звичайної фабрики
const formFieldFactory = new DefaultFormFieldFactory()
// Легко змінивши фабрику, повністю зміняться варіанти відображення полів форми

const emailField = formFieldFactory.createEmailField()
const passwordField = formFieldFactory.createPasswordField()

// ...

return (
  <form onSubmit={handleSubmit(handleLogin)} className='space-y-4' role='form'>
    {emailField.render({
      id: 'login-email',
      registration: register('email'),
    })}
    {passwordField.render({
      id: 'login-password',
      registration: register('password'),
    })}
    <Button type='submit' className='w-full'>
      Увійти
    </Button>
  </form>
)
```

`icon-sign-in-form.tsx` (фрагмент)
