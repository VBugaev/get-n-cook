import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes.js';

const getDefaultModelCluster = () => ({
    isLoading: false,
    data: {},
    error: ''
});

const getUserModelCluster = () => ({
    isLoading: false,
    data: {},
    updateData: {},
    error: '',
    isModalOpened: false
});

export const users = (state = getUserModelCluster(), action) => {
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
        case actionTypes.TOGGLE_USERS_UPDATE_MODAL:
            return {
                ...state,
                isModalOpened: !state.isModalOpened
            }
        case actionTypes.FETCH_USER_UPDATE_DATA:
            return {
                ...state,
                updateData: action.payload.updateData
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
        case actionTypes.FETCH_UPDATED_CATEGORIES_ROW: {
            const newState = { ...state };
            newState.data[action.payload.updatedRow.Id] = action.payload.updatedRow;
            return newState;
        }
        case actionTypes.CATEGORY_FORM_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export const ingredients = (state = getDefaultModelCluster(), action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS_COMPLETE:
            return {
                ...state,
                error: '',
                data: action.payload.data,
                isLoading: false
            };
        case actionTypes.FETCH_UPDATED_INGREDIENTS_ROW: {
            const newState = { ...state };
            newState.data[action.payload.updatedRow.Id] = action.payload.updatedRow;
            return newState;
        }
        case actionTypes.INGREDIENT_FORM_ERROR:
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
    categories, 
    ingredients
});
