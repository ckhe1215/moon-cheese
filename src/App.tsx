import { ErrorBoundary, Suspense } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import ErrorSection from './components/ErrorSection';
import { CurrencyProvider } from './providers/CurrencyProvider';
import GlobalProvider from './providers/GlobalProvider';
import router from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <ErrorBoundary fallback={<ErrorSection />}>
          <Suspense fallback={<div>Loading...</div>}>
            <CurrencyProvider>
              <RouterProvider router={router} />
            </CurrencyProvider>
          </Suspense>
        </ErrorBoundary>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
