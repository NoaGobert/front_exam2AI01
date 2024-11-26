import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './utils/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </StrictMode>,
);
