import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes.js';

const getDefaultModelCluster = () => ({
    isLoading: false,
    data: []
});

export const users = (state = getDefaultModelCluster(), action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_USERS_COMPLETE:
            return {
                data: action.payload.data,
                isLoading: false
            };
        default:
            return state;
    }
};

export const roles = (state = getDefaultModelCluster(), action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROLES_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_ROLES_COMPLETE:
            return {
                data: action.payload.data,
                isLoading: false
            };
        default:
            return state;
    }
}

export const categories = (state = getDefaultModelCluster(), action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_CATEGORIES_COMPLETE:
            return {
                data: action.payload.data,
                isLoading: false
            };
        default:
            return state;
    }
}

export default combineReducers({
    users,
    roles,
    categories
});
