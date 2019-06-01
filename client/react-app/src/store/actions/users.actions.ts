import * as actionTypes from './actionTypes';

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

export const fetchProfile = () => ({
  type: actionTypes.FETCH_PROFILE,
});

export const fetchProfileFail = (error: any) => ({
  type: actionTypes.FETCH_PROFILE_FAIL,
  error
});

export const fetchProfileSuccess = (profile: any) => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileNotFound = () => ({
  type: actionTypes.FETCH_PROFILE_NOT_FOUND,
});

export const signOut = () => ({
  type: actionTypes.SIGN_OUT,
});

export const signOutFail = (error: any) => ({
  type: actionTypes.SIGN_OUT_FAIL,
  payload: error
});

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS
});