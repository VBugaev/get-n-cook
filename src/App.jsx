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
import MainPage from './pages/mainPage/mainPage';
import RecipeDetailsPage from './pages/recipeDetailsPage/recipeDetailsPage';
<<<<<<< HEAD
=======
import ProfilePage from './pages/profilePage/profilePage';
>>>>>>> parent of a533285... delete FE at all

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
              <Route path="/recipe/:id" component={RecipeDetailsPage} />
              <Route path="/create-recipe" component={CreateRecipePage} />
<<<<<<< HEAD
=======
              <Route path="/profile" component={ProfilePage} />
>>>>>>> parent of a533285... delete FE at all
              <Route path="/" component={MainPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
