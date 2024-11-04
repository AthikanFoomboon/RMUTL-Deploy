import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'; 
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// สร้าง store
const store = configureStore({
  reducer: rootReducer,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HashRouter> 
      <App />
    </HashRouter> 
  </Provider>
);
