import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  getToken?: () => string | null | undefined;
}

function createApiClient(config: ApiClientConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 15000,
    withCredentials: config.withCredentials ?? true,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // Request interceptor - attach auth token if a token getter function is provided
  instance.interceptors.request.use(
    (requestConfig) => {
      const token = config.getToken?.();
      if (token && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor - handle common errors (e.g. 401 Unauthorized)
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized (e.g., trigger session refresh or redirect)
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

// Default client instance - configure via environment variables
const apiClient = createApiClient({
  baseURL:
    typeof process !== 'undefined'
      ? (process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? '/api')
      : '/api',
});

export { apiClient, createApiClient };
