# **Proxy Pattern**🛡️ | [api-proxy з кодом](../../src/patterns/proxy/api-proxy.ts)

## Контекст проблеми 📝

Іноді потрібен проміжний шар між клієнтом і реальною реалізацією API — для кешування,
логування, контролю доступу тощо, адже API-запити можуть бути дорогими за часом і
ресурсами. Прямий виклик адаптера в такому випадку не гнучкий, адже у деяких випадках
ті самі запити повторюються кілька разів. Тому необхідна система кешування та логування
запитів, не змінюючи основну логіку HTTP-клієнта.

## Причина використання патерну Proxy 🤔

Proxy дозволяє вставити об'єкт-замісник перед реальною реалізацією, щоб розширити або
змінити її поведінку, не змінюючи сам клас. Це дозволяє:

- Додати кешування, логування або валідацію до HTTP-клієнта без зміни його реалізації.
- Забезпечити додатковий контроль за запитами на рівні обгортки.

## Переваги використання ✅

- **Кешування**: зниження кількості HTTP-запитів
- **Логування**: прозорий запис усіх запитів
- **Контроль доступу**: перевірки перед запитом
- Гнучке розширення поведінки без зміни оригінального клієнта

## Недоліки використання ⚠️

- **Ускладнення**: ще один рівень абстракції
- **Складність налагодження**: помилки можуть бути в Proxy, а не в адаптері
- Можлива дублююча логіка або складність при відлагодженні

## Опис реалізації 🔧

`ApiProxy` реалізує інтерфейс `HttpClient` і містить `ApiCache`. При виклику `get` формує
ключ, перевіряє кеш, логує запит, і в разі потреби передає виклик далі в адаптер.

## Кодова реалізація 💻

```ts
class ApiProxy implements HttpClient {
  private target: HttpClient
  private cache = new ApiCache()

  constructor(target: HttpClient) {
    this.target = target
  }

  async get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    const key = this.createCacheKey('GET', url, options)
    const cached = this.cache.get<T>(key)
    if (cached) return cached

    this.logApiCall('GET', url, options)
    try {
      const response = await this.target.get<T>(url, options)
      this.cache.set(key, response)
      return response
    } catch (error) {
      this.handleError(error, 'GET', url)
    }
  }
}
```

```ts
class ApiCache {
  private cache = new Map<
    string,
    { data: ApiResponse<unknown>; timestamp: number }
  >()
  private readonly DEFAULT_TTL = 1000 * 60 * 5

  set<T>(key: string, data: ApiResponse<T>, ttl = this.DEFAULT_TTL) {
    this.cache.set(key, { data, timestamp: Date.now() + ttl })
  }

  get<T>(key: string): ApiResponse<T> | null {
    const cached = this.cache.get(key)
    if (!cached || cached.timestamp < Date.now()) return null
    return cached.data as ApiResponse<T>
  }
}
```
