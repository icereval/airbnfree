import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'antd/dist/antd.min.css';
import '../public/index.css';
import appReducer from './containers/appReducer';
import App from './containers/App';

const middleware = [];
middleware.push(thunk);

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
