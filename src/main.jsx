import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/plugins/redux/store/index'; 
import '@/index.css'; 
import '@/plugins/axios'; 
import router from '@/plugins/router'; 

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
 
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);