import { getRecipeDetailsPage } from '../../modules/app/selectors.js';

const FETCH_RECIPE_COMPLETE = 'recipeDetailsPage/FETCH_RECIPE_COMPLETE';
const FETCH_USER_RATE = 'recipeDetailsPage/FETCH_USER_RATE';
const ADD_USER_RATE = 'recipeDetailsPage/ADD_USER_RATE';
const ADD_USER_REVIEW = 'recipeDetailsPage/ADD_USER_REVIEW';

const fetchRecipeComplete = (data) => ({
    type: FETCH_RECIPE_COMPLETE,
    payload: {
        data: data || {}
    }
});

const fetchUserRateComplete = (data) => ({
    type: FETCH_USER_RATE,
    payload: {
        data: data || {}
    }
});

export const fetchRecipe = (recipeId) => dispatch => {
    fetch(`http://127.0.0.1:3000/api/recipe/${recipeId}`)
        .then(res => {
            return res.json();
        })
        .then(values => {
            dispatch(fetchRecipeComplete(values));
        });
}


export const getCategoryData = (state) => getRecipeDetailsPage(state).categoryData;

const defaultState = {
    categoryData: {},
    error: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_RECIPE_COMPLETE:
            return {
                ...state,
                error: '',
                categoryData: action.payload.data
            };
        default:
            return state;
    }
}