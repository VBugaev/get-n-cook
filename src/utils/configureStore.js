import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import app from '../modules/app/reducers.js';

let middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (preloadedState) => createStore(app, preloadedState, composeEnhancers(applyMiddleware(...middleware)));