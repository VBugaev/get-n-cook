import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import app from '../modules/app/reducers.js';

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (preloadedState) => createStore(app, preloadedState, composeEnhancers(applyMiddleware(...middleware)));