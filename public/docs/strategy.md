# **Strategy Pattern**♟️ | [strategy директорія з кодом](../../src/patterns/strategy/)

## Контекст проблеми 📝

У застосунках для роботи з книгами часто виникає потреба в різноманітних фільтрах (за назвою,
автором, категорією, рейтингом) або взаємодіях (додати коментар, лайк чи огляд). Кожна
така дія має свою логіку, але її потрібно використовувати гнучко, без дублювання коду.

## Причина використання патерну Strategy 🤔

Strategy дозволяє інкапсулювати змінювану поведінку в окремі класи та динамічно обирати
потрібну реалізацію під час виконання. Це допомагає уникати громіздких умовних конструкцій
і зробити код відкритим до розширення, але закритим до модифікації.

## Переваги використання ✅

- **Гнучкість**: легко додати нову дію без зміни контексту
- **Інкапсуляція**: логіка кожної стратегії ізольована
- **Заміна на льоту**: можливість комбінувати/змінювати стратегії під час виконання
- **Просте тестування**: кожну стратегію можна тестувати окремо

## Недоліки використання ⚠️

- **Більше класів**: кожна стратегія — окремий клас
- **Потреба в узгодженому інтерфейсі**: всі стратегії мають реалізовувати певні методи

## Опис реалізації 🔧

Існує два контексти:

1. `FilterContext` — керує наборами фільтрів (`FilterStrategy`) для пошуку книг.
2. `InteractionContext` — керує наборами взаємодій з книгами (`BookInteractionStrategy`),
   наприклад: огляди, коментарі, лайки.

Кожна стратегія реалізує спільний інтерфейс і виконує свою унікальну логіку.

## Кодова реалізація 💻

### 🔍 Інтерфейс та реалізації FilterStrategy

`filter-strategies.ts`

```ts
export interface FilterStrategy<T = unknown> {
  filter(books: Book[], value: T): Book[]
  getQueryParamName(): string
}

abstract class BaseStringFilterStrategy implements FilterStrategy<string> {
  abstract filterByValue(books: Book[], value: string): Book[]
  abstract getQueryParamName(): string

  protected matchIncludes(field: string, value: string): boolean {
    return field.toLowerCase().includes(value.toLowerCase())
  }

  filter(books: Book[], value: string): Book[] {
    if (!value?.trim()) return books
    return this.filterByValue(books, value)
  }
}

export class NameFilterStrategy extends BaseStringFilterStrategy {
  filterByValue(books: Book[], value: string): Book[] {
    return books.filter((book) => this.matchIncludes(book.name, value))
  }

  getQueryParamName(): string {
    return 'name'
  }
}

export class FilterContext {
  private strategies: Map<string, FilterStrategy> = new Map()

  applyFilters(books: Book[], filters: Filters): Book[] {
    return Object.entries(filters).reduce((acc, [key, value]) => {
      const strategy = this.strategies.get(key)
      return value && strategy ? strategy.filter(acc, value) : acc
    }, books)
  }
}
```

`book-interaction-strategies.ts`

```ts
export interface BookInteractionStrategy<T = unknown> {
  execute(bookId: string, data: T): Promise<void>
  getType(): string
}

export class LikeStrategy implements BookInteractionStrategy<boolean> {
  async execute(bookId: string, isLiked: boolean): Promise<void> {
    if (isLiked) {
      await BooksAPI.dislikeBookById(bookId)
    } else {
      await BooksAPI.likeBookById(bookId)
    }
  }

  getType(): string {
    return 'like'
  }
}

export class InteractionContext {
  private strategies: Map<string, BookInteractionStrategy> = new Map()

  async executeStrategy<T>(
    type: string,
    bookId: string,
    data: T,
  ): Promise<void> {
    const strategy = this.strategies.get(type)
    if (!strategy) throw new Error(`Strategy for type ${type} not found`)
    await strategy.execute(bookId, data)
  }
}
```
