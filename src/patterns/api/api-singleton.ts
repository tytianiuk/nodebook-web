import { NodebookApiAdapter } from './api-adapter'

import type { ApiResponse, HttpClient, RequestOptions } from '@/lib/http-client'

const PRIVATE_CONSTRUCTOR = Symbol('ApiSingleton')

export class ApiSingleton implements HttpClient {
  private static instance: ApiSingleton | null = null
  private adapter: HttpClient

  private constructor(token: symbol, baseURL?: string) {
    if (token !== PRIVATE_CONSTRUCTOR) {
      throw new Error('Use getInstance() instead of new operator')
    }

    this.adapter = new NodebookApiAdapter(baseURL)
  }

  public static getInstance(baseURL?: string): ApiSingleton {
    if (!ApiSingleton.instance) {
      ApiSingleton.instance = new ApiSingleton(PRIVATE_CONSTRUCTOR, baseURL)
    }
    return ApiSingleton.instance
  }

  public static resetInstance(): void {
    ApiSingleton.instance = null
  }

  async get<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.adapter.get<T>(url, options)
  }

  async post<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.adapter.post<T>(url, options)
  }

  async patch<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.adapter.patch<T>(url, options)
  }

  async put<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.adapter.put<T>(url, options)
  }

  async delete<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.adapter.delete<T>(url, options)
  }
}

export const apiSingleton = ApiSingleton.getInstance()
