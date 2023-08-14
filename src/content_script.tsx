import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from '@/utils';

const ContentScript = () => {
  return <div>1</div>;
};

const { body } = document;
const root = document.createElement('div');
root.id = 'root-content-script';
body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContentScript />
    </QueryClientProvider>
  </StrictMode>,
);
