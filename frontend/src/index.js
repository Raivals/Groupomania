import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import du style du site web
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';


// Creation du store
const store = legacy_createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


