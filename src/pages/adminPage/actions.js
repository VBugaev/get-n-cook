import * as actionTypes from './actionTypes';
import { normalizeArray } from '../../utils/arrayUtils.js';
import { getUserById } from './selectors';

export const fetchUsersStart = () => ({
    type: actionTypes.FETCH_USERS_START
});

export const fetchUsersComplete = (data) => ({
    type: actionTypes.FETCH_USERS_COMPLETE,
    payload: {
        data: data.length ? normalizeArray(data) : {}
    }
});

export const fetchUserFormError = (error) => ({
    type: actionTypes.USER_FORM_ERROR,
    payload: {
        error
    }
});

export const fetchUpdatedUsersRow = (updatedRow) => ({
    type: actionTypes.FETCH_UPDATED_USERS_ROW,
    payload: {
        updatedRow
    }
});

export const fetchUpdatedCategoriesRow = (updatedRow) => ({
    type: actionTypes.FETCH_UPDATED_CATEGORIES_ROW,
    payload: {
        updatedRow
    }
});

export const fetchCategoriesStart = () => ({
    type: actionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesComplete = (data) => ({
    type: actionTypes.FETCH_CATEGORIES_COMPLETE,
    payload: {
        data: data.length ? normalizeArray(data) : {}
    }
});

export const fetchCategoryFormError = (error) => ({
    type: actionTypes.CATEGORY_FORM_ERROR,
    payload: {
        error
    }
});

export const fetchRolesStart = () => ({
    type: actionTypes.FETCH_ROLES_START
});

export const fetchRolesComplete = (data) => ({
    type: actionTypes.FETCH_ROLES_COMPLETE,
    payload: {
        data: data.length ? normalizeArray(data) : {}
    }
});

export const toggleUsersUpdateModal = () => ({
    type: actionTypes.TOGGLE_USERS_UPDATE_MODAL
});

export const fetchUserUpdateData = (updateData) => ({
    type: actionTypes.FETCH_USER_UPDATE_DATA,
    payload: {
        updateData
    }
});

export const openUpdateUserModal = (id) => (dispatch, getState) => {
    const state = getState();
    const updatedUser = getUserById(state, id);
    const updateData = {
        name: updatedUser.Name,
        surname: updatedUser.Surname,
        roleId: updatedUser.RoleId
    };
    dispatch(fetchUserUpdateData(updateData));
    dispatch(toggleUsersUpdateModal());
}

export const getUsers = () => dispatch => {
    dispatch(fetchUsersStart());
    fetch('api/users')
        .then(res => {
            return res.json();
        })
        .then(values => {
            dispatch(fetchUsersComplete(values));
        });
};

export const getRoles = () => dispatch => {
    dispatch(fetchRolesStart());
    fetch('api/roles')
        .then(res => {
            return res.json();
        })
        .then(values => {
            dispatch(fetchRolesComplete(values));
        });
};

export const getCategories = () => dispatch => {
    dispatch(fetchCategoriesStart());
    fetch('api/categories')
        .then(res => {
            return res.json();
        })
        .then(values => {
            dispatch(fetchCategoriesComplete(values));
        });
};

export const createUserByAdmin = (userData) => dispatch => {
    fetch('api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...userData,
            isCreatedByAdmin: true
        })
    }).then(r => r.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchUserFormError(data.error));
            } else {
                dispatch(fetchUserFormError(''));
                dispatch(fetchUpdatedUsersRow(data));
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateUserByAdmin = (userData, id) => dispatch => {
    fetch('api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...userData,
            isUpdatedByAdmin: true,
            id
        })
    }).then(r => r.json())
        .then(data => {
            dispatch(fetchUpdatedUsersRow(data));
            dispatch(toggleUsersUpdateModal());
        })
        .catch(err => {
            console.log(err);
        });
}

export const createCategoryByAdmin = (categoryData) => dispatch => {

}