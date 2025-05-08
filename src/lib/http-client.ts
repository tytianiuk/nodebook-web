import type { ApiResponse as NodebookApiResponse } from 'nodebook-api'

export type ApiResponse<T = unknown> = NodebookApiResponse<T>

export interface RequestOptions {
  params?: Record<string, string | number>
  body?: unknown
}

export interface HttpClient {
  get<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>>
  post<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>>
  patch<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>>
  put<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>>
  delete<T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>>
}
