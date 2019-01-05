import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes.js';

const getDefaultModelCluster = () => ({
    isLoading: false,
    data: {},
    error: ''
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
                ...state,
                error: '',
                data: action.payload.data,
                isLoading: false
            };
        case actionTypes.USER_FORM_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        case actionTypes.FETCH_UPDATED_USERS_ROW: {
            const newState = { ...state };
            newState.data[action.payload.updatedRow.Id] = action.payload.updatedRow;
            return newState;
        }
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
                ...state,
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
                ...state,
                error: '',
                data: action.payload.data,
                isLoading: false
            };
        case actionTypes.CATEGORY_FORM_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default combineReducers({
    users,
    roles,
    categories
});
