import BooksAPI from '@/api/books-api'

export interface BookInteractionStrategy<T = unknown> {
  execute(bookId: string, data: T): Promise<void>
  getType(): string
}

export class ReviewStrategy
  implements BookInteractionStrategy<{ comment: string; rating: number }>
{
  async execute(
    bookId: string,
    data: { comment: string; rating: number },
  ): Promise<void> {
    await BooksAPI.addReview(bookId, data)
  }

  getType(): string {
    return 'review'
  }
}

export class CommentStrategy
  implements BookInteractionStrategy<{ content: string }>
{
  async execute(bookId: string, data: { content: string }): Promise<void> {
    await BooksAPI.addComment(bookId, data.content)
  }

  getType(): string {
    return 'comment'
  }
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

  constructor(
    strategies: BookInteractionStrategy[] = [
      new ReviewStrategy(),
      new CommentStrategy(),
      new LikeStrategy(),
    ],
  ) {
    strategies.forEach((strategy) => this.addStrategy(strategy))
  }

  addStrategy(strategy: BookInteractionStrategy): void {
    this.strategies.set(strategy.getType(), strategy)
  }

  async executeStrategy<T>(
    type: string,
    bookId: string,
    data: T,
  ): Promise<void> {
    const strategy = this.strategies.get(type)
    if (!strategy) throw new Error(`Strategy for type ${type} not found`)
    await strategy.execute(bookId, data)
  }

  getStrategy(type: string): BookInteractionStrategy | undefined {
    return this.strategies.get(type)
  }
}

export const interactionContext = new InteractionContext()
