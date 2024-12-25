import env from '@/lib/env'

export interface ApiResponse<T> {
  data: T
  status: number
  headers: Headers
}

export interface ApiError extends Error {
  status?: number
  statusText?: string
  data?: unknown
}

export interface RequestConfig<T = unknown> {
  baseURL?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: Record<string, unknown> | Array<unknown> | T
  withCredentials?: boolean
  timeout?: number
  signal?: AbortSignal
  cache?: RequestCache
  onUploadProgress?: (progressEvent: { loaded: number; total: number }) => void
}

export type GetConfig = Omit<RequestConfig, 'method'>
export type PostConfig = Omit<RequestConfig, 'method'>
export type PutConfig = Omit<RequestConfig, 'method'>
export type DeleteConfig = Omit<RequestConfig, 'method'>
export type PatchConfig = Omit<RequestConfig, 'method'>

const request = async <T>(
  url: string,
  config: RequestConfig = {},
): Promise<ApiResponse<T>> => {
  const {
    baseURL = env.API_URL,
    method = 'GET',
    headers = {},
    body,
    withCredentials = true,
    timeout = 30000,
    signal,
    cache = 'default',
  } = config

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const options: RequestInit = {
      method,
      headers: defaultHeaders,
      credentials: withCredentials ? 'include' : 'same-origin',
      signal: signal || controller.signal,
      cache,
    }

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(baseURL + url, options)
    clearTimeout(timeoutId)

    let data: T
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else if (contentType?.includes('text')) {
      data = (await response.text()) as unknown as T
    } else {
      data = (await response.blob()) as unknown as T
    }

    if (!response.ok) {
      const error: ApiError = new Error(response.statusText)
      error.status = response.status
      error.statusText = response.statusText
      error.data = data
      throw error
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
    }
  } catch (error) {
    clearTimeout(timeoutId)

    if ((error as Error).name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`)
    }

    throw error
  }
}

const api = {
  get: <T>(url: string, config: GetConfig = {}) =>
    request<T>(url, { ...config, method: 'GET' }),

  post: <T>(url: string, config: PostConfig = {}) =>
    request<T>(url, { ...config, method: 'POST' }),

  put: <T>(url: string, config: PutConfig = {}) =>
    request<T>(url, { ...config, method: 'PUT' }),

  delete: <T>(url: string, config: DeleteConfig = {}) =>
    request<T>(url, { ...config, method: 'DELETE' }),

  patch: <T>(url: string, config: PatchConfig = {}) =>
    request<T>(url, { ...config, method: 'PATCH' }),
}

export default api
