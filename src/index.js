import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import './index.css';
import configureStore from './redux/configureStore';

/* it can be useful to pass initial state into the store here
 if you're server rendering or rehydrating the Redux store with 
 data from local storage */
const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app'),
);
