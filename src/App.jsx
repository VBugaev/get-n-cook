import React, { Component } from 'react';

import './utils/fontAwesomeLibrary.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import AdminPage from './pages/adminPage/adminPage.jsx';
import CreateRecipePage from './pages/createRecipePage/createRecipePage.jsx';
import RecipeDetailsPage from './pages/recipeDetailsPage/recipeDetailsPage';

import { Provider } from 'react-redux';
import { configureStore } from './utils/configureStore.js';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route path="/admin-management" component={AdminPage} />
              <Route path="/recipe" component={RecipeDetailsPage} />
              <Route path="/" component={CreateRecipePage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
