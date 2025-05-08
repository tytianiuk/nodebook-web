import { api } from 'nodebook-api'

import env from '@/lib/env'
import type { ApiResponse, HttpClient, RequestOptions } from '@/lib/http-client'

export class NodebookApiAdapter implements HttpClient {
  private baseURL: string

  constructor(baseURL = env.API_URL) {
    this.baseURL = baseURL
  }

  async get<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await api.get(url, {
      baseURL: this.baseURL,
      params: options?.params,
    })
  }

  async post<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await api.post(url, {
      baseURL: this.baseURL,
      body: options?.body,
      params: options?.params,
    })
  }

  async patch<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await api.patch(url, {
      baseURL: this.baseURL,
      body: options?.body,
      params: options?.params,
    })
  }

  async put<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await api.put(url, {
      baseURL: this.baseURL,
      body: options?.body,
      params: options?.params,
    })
  }

  async delete<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return await api.delete(url, {
      baseURL: this.baseURL,
      params: options?.params,
    })
  }
}

export const httpClient = new NodebookApiAdapter()
