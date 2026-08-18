import { QueryProvider, RouterProvider } from './providers';
import { AppRoutes } from './router/routes';

export function App() {
  return (
    <QueryProvider>
      <RouterProvider>
        <AppRoutes />
      </RouterProvider>
    </QueryProvider>
  );
}
