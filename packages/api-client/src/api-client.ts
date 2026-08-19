import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

function createApiClient(config: ApiClientConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 15000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // Request interceptor - attach auth token
  instance.interceptors.request.use(
    (requestConfig) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (token && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor - handle common errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized - e.g., redirect to login, clear token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

// Default client instance - configure via environment variables
const apiClient = createApiClient({
  baseURL: typeof process !== 'undefined' ? (process.env.VITE_API_BASE_URL ?? '/api') : '/api',
});

export { apiClient, createApiClient };
