import { ErrorBoundary, Suspense } from '@suspensive/react';
import { RouterProvider } from 'react-router';
import ErrorSection from './components/ErrorSection';
import GlobalProvider from './providers/GlobalProvider';
import router from './router';

function App() {
  return (
    <GlobalProvider>
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </GlobalProvider>
  );
}

export default App;
