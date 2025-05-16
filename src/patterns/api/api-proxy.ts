import type { ApiResponse, HttpClient, RequestOptions } from '@/lib/http-client'

class ApiCache {
  private cache: Map<
    string,
    { data: ApiResponse<unknown>; timestamp: number }
  > = new Map()
  private readonly DEFAULT_TTL = 1000 * 60 * 5

  set<T>(key: string, data: ApiResponse<T>, ttl = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data: data as ApiResponse<unknown>,
      timestamp: Date.now() + ttl,
    })
  }

  get<T>(key: string): ApiResponse<T> | null {
    const cached = this.cache.get(key)

    if (!cached) return null

    if (cached.timestamp < Date.now()) {
      this.cache.delete(key)
      return null
    }

    return cached.data as ApiResponse<T>
  }

  invalidate(keyPattern: RegExp): void {
    for (const key of this.cache.keys()) {
      if (keyPattern.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  invalidateRelated(url: string): void {
    const urlParts = url.split('/')
    const resourceType = urlParts[1]

    this.invalidate(new RegExp(`^GET:/${resourceType}`))

    if (urlParts.length > 2) {
      const resourceId = urlParts[2]
      this.invalidate(new RegExp(`^GET:/${resourceType}/${resourceId}`))
    }
  }

  invalidateUserRelated(): void {
    this.invalidate(/^GET:\/users/)
    this.invalidate(/^GET:\/books\/liked/)
    this.invalidate(/^GET:\/auth/)
  }

  clear(): void {
    this.cache.clear()
  }
}

export class ApiProxy implements HttpClient {
  private target: HttpClient
  private cache: ApiCache

  constructor(target: HttpClient) {
    this.target = target
    this.cache = new ApiCache()
  }

  private createCacheKey(
    method: string,
    url: string,
    options?: RequestOptions,
  ): string {
    return `${method}:${url}:${options ? JSON.stringify(options) : ''}`
  }

  private logApiCall(
    method: string,
    url: string,
    options?: RequestOptions,
  ): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API ${method}]`, url, options)
    }
  }

  private handleError(error: unknown, method: string, url: string): never {
    console.error(`[API Error ${method}]`, url, error)

    throw error
  }

  async get<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    this.logApiCall('GET', url, options)

    const cacheKey = this.createCacheKey('GET', url, options)
    const cachedResponse = this.cache.get<T>(cacheKey)

    if (cachedResponse) {
      return cachedResponse
    }

    try {
      const response = await this.target.get<T>(url, options)

      this.cache.set(cacheKey, response)

      return response
    } catch (error) {
      return this.handleError(error, 'GET', url)
    }
  }

  async post<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    this.logApiCall('POST', url, options)

    try {
      const response = await this.target.post<T>(url, options)

      if (url === '/auth/logout') {
        this.cache.invalidateUserRelated()
      } else {
        this.cache.invalidateRelated(url)
      }

      return response
    } catch (error) {
      return this.handleError(error, 'POST', url)
    }
  }

  async patch<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    this.logApiCall('PATCH', url, options)

    try {
      const response = await this.target.patch<T>(url, options)

      this.cache.invalidateRelated(url)

      return response
    } catch (error) {
      return this.handleError(error, 'PATCH', url)
    }
  }

  async put<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    this.logApiCall('PUT', url, options)

    try {
      const response = await this.target.put<T>(url, options)

      this.cache.invalidateRelated(url)

      return response
    } catch (error) {
      return this.handleError(error, 'PUT', url)
    }
  }

  async delete<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    this.logApiCall('DELETE', url, options)

    try {
      const response = await this.target.delete<T>(url, options)

      this.cache.invalidateRelated(url)

      return response
    } catch (error) {
      return this.handleError(error, 'DELETE', url)
    }
  }
}
