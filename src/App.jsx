import React, { Component } from 'react';

import './utils/fontAwesomeLibrary.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import AdminPage from './pages/adminPage/adminPage.jsx';

import { Provider } from 'react-redux';
import { configureStore } from './utils/configureStore.js';

const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AdminPage />
      </Provider>
    );
  }
}

export default App;
