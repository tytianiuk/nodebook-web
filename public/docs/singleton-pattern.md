# **Singleton Pattern**☝️ | [singleton з кодом](../../src/patterns/singleton/api-singleton.ts)

## Контекст проблеми 📝

У багатьох застосунках потрібно мати єдиний екземпляр певного сервісу або клієнта для
спільного використання (наприклад, API-клієнт). Важливо гарантувати, що лише один
екземпляр клієнта створюється протягом усього життєвого циклу програми.

## Причина використання патерну Singleton 🤔

Singleton гарантує, що клас має лише один екземпляр, і забезпечує глобальну точку доступу
до нього (централізований контроль над глобальним станом).

## Переваги використання ✅

- **Один екземпляр**: економія ресурсів
- **Глобальний доступ**: централізоване управління
- **Інкапсуляція створення**: клієнти не створюють об'єкти напряму

## Недоліки використання ⚠️

- **Тестування**: важче підміняти залежності
- **Слабка розширюваність**: обмеження на кількість інстансів
- У деяких випадках порушення інверсії залежностей

## Опис реалізації 🔧

Клас `ApiSingleton` має приватний конструктор, прихований за `Symbol`, і блокує створення
об’єктів напряму. Метод `getInstance` повертає один екземпляр, ініціалізуючи його лише
один раз. Вся логіка делегується `ApiProxy` для кешування.

## Кодова реалізація 💻

```ts
export class ApiSingleton implements HttpClient {
  private static instance: ApiSingleton | null = null

  private constructor(token: symbol, baseURL?: string) {
    if (token !== PRIVATE_CONSTRUCTOR) {
      throw new Error('Use getInstance() instead of new operator')
    }

    this.adapter = new NodebookApiAdapter(baseURL)
    this.proxy = new ApiProxy(this.adapter)
  }

  public static getInstance(baseURL?: string): ApiSingleton {
    if (!ApiSingleton.instance) {
      ApiSingleton.instance = new ApiSingleton(PRIVATE_CONSTRUCTOR, baseURL)
    }
    return ApiSingleton.instance
  }
}
```
