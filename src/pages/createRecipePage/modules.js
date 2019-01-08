import { normalizeArray } from '../../utils/arrayUtils.js';
import { getCreateRecipePage } from '../../modules/app/selectors';
import { values } from 'lodash';

const FETCH_CATEGORIES_COMPLETE = 'createRecipePage/FETCH_CATEGORIES_COMPLETE';
const FETCH_INGREDIENTS_COMPLETE = 'createRecipePage/FETCH_INGREDIENTS_COMPLETE';
const CREATE_RECIPE_FORM_ERROR = 'createRecipePage/CREATE_RECIPE_FORM_ERROR';

export const fetchIngredientsComplete = (data) => ({
    type: FETCH_INGREDIENTS_COMPLETE,
    payload: {
        data: data.length ? normalizeArray(data) : {}
    }
});

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
export const fetchIngredients = () => dispatch => {
    fetch('api/ingredients')
        .then(res => {
            return res.json();
        })
        .then(values => {
            dispatch(fetchIngredientsComplete(values));
        });
};

export const getCategories = (state) => values(getCreateRecipePage(state).categories);
export const getIngredients = (state) => values(getCreateRecipePage(state).ingredients);
export const getCreateRecipeError = (state) => getCreateRecipePage(state).error;
export const getNonSelectedCategories = (state, ids) => getCategories(state).filter(category => !ids.includes(category.Id));

const defaultState = {
    categories: {},
    ingredients: {},
    error: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_COMPLETE:
            return {
                ...state,
                error: '',
                categories: action.payload.data
            };
        case FETCH_INGREDIENTS_COMPLETE:
            return {
                ...state,
                error: '',
                ingredients: action.payload.data
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