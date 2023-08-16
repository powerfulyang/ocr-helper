import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from '@/utils';
import { ContentScript, root } from './components/ContentScript';
import '@/styles/base.scss';

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContentScript />
    </QueryClientProvider>
  </StrictMode>,
);
