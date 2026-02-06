import AsyncBoundary from '@/components/AsyncBoundary';
import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './CartProvider';
import { CurrencyProvider } from './CurrencyProvider';

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AsyncBoundary>
        <EnhancedToastProvider>
          <CurrencyProvider>
            <CartProvider>{children}</CartProvider>
          </CurrencyProvider>
        </EnhancedToastProvider>
      </AsyncBoundary>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
