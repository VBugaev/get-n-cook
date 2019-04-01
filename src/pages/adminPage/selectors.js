import { orderBy, values } from 'lodash';
import { getAdminPage } from '../../modules/app/selectors';

export const getUsers = (state) => getAdminPage(state).users;
export const getRoles = (state) => getAdminPage(state).roles;
export const getCategories = (state) => getAdminPage(state).categories;
export const getIngredients = (state) => getAdminPage(state).ingredients;

export const getUsersIsLoading = state => getUsers(state).isLoading;
export const getUsersData = state => orderBy(values(getUsers(state).data), ['UpdatedAt'], ['desc']);
export const getUserById = (state, id) => getUsers(state).data[id];
export const getUserFormError = state => getUsers(state).error;
export const getUserFormDataForUpdate = state => getUsers(state).dataForUpdate;
export const getIsUserModalOpened = state => getUsers(state).isModalOpened;
export const getUpdateUserData = state => getUsers(state).updateData;

export const getRolesIsLoading = state => getRoles(state).isLoading;
export const getRolesData = state => values(getRoles(state).data);

export const getCategoriesIsLoading = state => getCategories(state).isLoading;
export const getCategoriesData = state => values(getCategories(state).data);
export const getCategoryFormError = state => getCategories(state).error;

export const getIngredientsIsLoading = state => getIngredients(state).isLoading;
export const getIngredientsData = state => values(getIngredients(state).data);
export const getIngredientFormError = state => getIngredients(state).error;