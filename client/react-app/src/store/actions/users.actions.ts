import * as actionTypes from './users.types';

export const fetchUsers = () => ({
  type: actionTypes.FETCH_USERS
});

export const fetchUsersSuccess = (users: any[]) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFail = (error: any) => ({
  type: actionTypes.FETCH_USERS_FAIL,
  payload: error
});
