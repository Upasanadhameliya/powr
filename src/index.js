import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { Windmill } from '@windmill/react-ui'
import './fonts/Mulish/Mulish-VariableFont_wght.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Windmill>
        <App />
      </Windmill>
    </ChakraProvider>
  </React.StrictMode>)