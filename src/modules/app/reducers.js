import { combineReducers } from "redux";

import adminPage from '../../pages/adminPage/reducers.js';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    adminPage,
    form: formReducer
});