import { normalizeArray } from '../../utils/arrayUtils.js';
import { getCreateRecipePage } from '../../modules/app/selectors';
import { values } from 'lodash';

const FETCH_CATEGORIES_COMPLETE = 'createRecipePage/FETCH_CATEGORIES_COMPLETE';
const CREATE_RECIPE_FORM_ERROR = 'createRecipePage/CREATE_RECIPE_FORM_ERROR';

export const fetchCategoriesComplete = (data) => ({
    type: FETCH_CATEGORIES_COMPLETE,
    payload: {
        data: data.length ? normalizeArray(data) : {}
    }
});

export const fetchCreateRecipeFormError = (error) => ({
    type: CREATE_RECIPE_FORM_ERROR,
    payload: {
        error
    }
});

export const fetchCategories = () => dispatch => {
    fetch('api/categories')
        .then(res => {
            return res.json();
        })
        .then(values => {
            dispatch(fetchCategoriesComplete(values));
        });
};

export const getCategories = (state) => values(getCreateRecipePage(state).categories);
export const getCreateRecipeError = (state) => getCreateRecipePage(state).error;
export const getNonSelectedCategories = (state, ids) => getCategories(state).filter(category => !ids.includes(category.Id));

const defaultState = {
    categories: {},
    error: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_COMPLETE:
            return {
                error: '',
                categories: action.payload.data
            };
        case CREATE_RECIPE_FORM_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}