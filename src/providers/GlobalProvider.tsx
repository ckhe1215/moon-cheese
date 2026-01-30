import ErrorSection from '@/components/ErrorSection';
import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './CartProvider';
import { CurrencyProvider } from './CurrencyProvider';

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={({ reset }) => <ErrorSection onRetry={reset} />}>
        <Suspense fallback={<div>Loading...</div>}>
          <EnhancedToastProvider>
            <CurrencyProvider>
              <CartProvider>{children}</CartProvider>
            </CurrencyProvider>
          </EnhancedToastProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
