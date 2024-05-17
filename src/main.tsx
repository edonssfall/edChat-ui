import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from './App.tsx';
import React from 'react';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
