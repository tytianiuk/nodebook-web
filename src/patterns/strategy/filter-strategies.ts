import type { Book, Filters } from '@/types/book'

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

export class AuthorFilterStrategy extends BaseStringFilterStrategy {
  filterByValue(books: Book[], value: string): Book[] {
    return books.filter((book) => this.matchIncludes(book.author, value))
  }

  getQueryParamName(): string {
    return 'author'
  }
}

export class CategoryFilterStrategy implements FilterStrategy<string> {
  filter(books: Book[], categoryId: string): Book[] {
    if (!categoryId) return books
    return books.filter((book) => book.categoryId._id === categoryId)
  }

  getQueryParamName(): string {
    return 'category'
  }
}

export class RatingFilterStrategy implements FilterStrategy<number> {
  filter(books: Book[], minRating: number): Book[] {
    if (!minRating) return books
    return books.filter((book) => book.averageRating >= minRating)
  }

  getQueryParamName(): string {
    return 'minRating'
  }
}

export class FilterContext {
  private strategies: Map<string, FilterStrategy> = new Map()

  constructor(
    strategies: FilterStrategy[] = [
      new NameFilterStrategy(),
      new AuthorFilterStrategy(),
      new CategoryFilterStrategy(),
      new RatingFilterStrategy(),
    ],
  ) {
    strategies.forEach((strategy) => this.addStrategy(strategy))
  }

  addStrategy(strategy: FilterStrategy): void {
    this.strategies.set(strategy.getQueryParamName(), strategy)
  }

  removeStrategy(name: string): void {
    this.strategies.delete(name)
  }

  clearStrategies(): void {
    this.strategies.clear()
  }

  applyFilters(books: Book[], filters: Filters): Book[] {
    return Object.entries(filters).reduce((acc, [key, value]) => {
      const strategy = this.strategies.get(key)
      return value && strategy ? strategy.filter(acc, value) : acc
    }, books)
  }
}
