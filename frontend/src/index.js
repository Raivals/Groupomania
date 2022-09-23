import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import du style du site web
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

// Creation du store
const store = configureStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


