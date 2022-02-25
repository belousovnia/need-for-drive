import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
// import './css/orderPage.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReduser } from './store/reducers';

const store = createStore(rootReduser);

ReactDOM.render(
  
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
