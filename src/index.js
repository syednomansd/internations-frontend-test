import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './stores/';

const axiosInstance = axios.create({
  baseURL: 'https://syednomansd.herokuapp.com/api'
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
