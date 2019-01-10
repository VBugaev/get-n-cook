import { combineReducers } from "redux";

import adminPage from '../../pages/adminPage/reducers.js';
import createRecipePage from '../../pages/createRecipePage/modules';
import recipeDetailsPage  from '../../pages/recipeDetailsPage/modules';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    adminPage,
    createRecipePage,
    recipeDetailsPage,
    form: formReducer
});