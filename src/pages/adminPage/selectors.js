import { values } from 'lodash';
import { getAdminPage } from '../../modules/app/selectors';

export const getUsers = (state) => getAdminPage(state).users;
export const getRoles = (state) => getAdminPage(state).roles;
export const getCategories = (state) => getAdminPage(state).categories;

export const getUsersIsLoading = state => getUsers(state).isLoading;
export const getUsersData = state => values(getUsers(state).data);
export const getUserFormError = state => getUsers(state).error;

export const getRolesIsLoading = state => getRoles(state).isLoading;
export const getRolesData = state => values(getRoles(state).data);

export const getCategoriesIsLoading = state => getCategories(state).isLoading;
export const getCategoriesData = state => values(getCategories(state).data);
export const getCategoryFormError = state => getCategories(state).error;