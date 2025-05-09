import type { HttpClient } from '@/lib/http-client'
import { apiSingleton } from '@/patterns/api/api-singleton'

const PRIVATE_CONSTRUCTOR = Symbol('privateConstructor')

type ApiInstance = BaseApi<ApiInstance>

export abstract class BaseApi<T extends BaseApi<T>> {
  protected static instance: Record<string, ApiInstance> = {}
  protected httpClient: HttpClient

  protected constructor(constructorToken?: symbol) {
    if (constructorToken !== PRIVATE_CONSTRUCTOR) {
      throw new Error('Cannot instantiate directly. Use getInstance() instead.')
    }

    this.httpClient = apiSingleton
  }

  public static getInstance<U extends BaseApi<U>>(
    this: new (token: symbol) => U,
  ): U {
    const constructor = this as unknown as {
      new (token: symbol): U
      instance: Record<string, ApiInstance>
    }
    const className = constructor.name
    if (!constructor.instance[className]) {
      constructor.instance[className] = new constructor(PRIVATE_CONSTRUCTOR)
    }
    return constructor.instance[className] as U
  }

  protected get client(): HttpClient {
    return this.httpClient
  }
}
