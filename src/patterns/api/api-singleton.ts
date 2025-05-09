import { NodebookApiAdapter } from './api-adapter'
import { ApiProxy } from './api-proxy'

import type { ApiResponse, HttpClient, RequestOptions } from '@/lib/http-client'

const PRIVATE_CONSTRUCTOR = Symbol('ApiSingleton')

export class ApiSingleton implements HttpClient {
  private static instance: ApiSingleton | null = null
  private adapter: HttpClient
  private proxy: HttpClient

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

  public static resetInstance(): void {
    ApiSingleton.instance = null
  }

  async get<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.proxy.get<T>(url, options)
  }

  async post<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.proxy.post<T>(url, options)
  }

  async patch<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.proxy.patch<T>(url, options)
  }

  async put<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.proxy.put<T>(url, options)
  }

  async delete<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await this.proxy.delete<T>(url, options)
  }
}

export const apiSingleton = ApiSingleton.getInstance()
