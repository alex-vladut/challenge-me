import { API, Auth, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {
  fetchProfileFail,
  fetchProfileNotFound,
  fetchProfileSuccess,
  fetchUsersFail,
  fetchUsersSuccess,
  signOutFail,
  signOutSuccess,
} from '../actions/actions';
import { FETCH_PROFILE, FETCH_PROFILE_NOT_FOUND, FETCH_USERS, SIGN_OUT } from '../actions/actionTypes';

function fetchUsers(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_USERS),
      switchMap(() => API.graphql(graphqlOperation(queries.listUsers, { limit: 10 }))),
      map(response => fetchUsersSuccess(response.data.listUsers.items)),
      catchError(error => fetchUsersFail(error)),
    );
}

function fetchProfile(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_PROFILE),
      switchMap(() => from(Auth.currentAuthenticatedUser())),
      switchMap(authenticatedUser => API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.id }))),
      map(response => response.data.getUser ? fetchProfileSuccess(response.data.getUser) : fetchProfileNotFound()),
      catchError(error => fetchProfileFail(error)),
    );
}

function createProfile(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_PROFILE_NOT_FOUND),
      switchMap(() => from(Auth.currentAuthenticatedUser())),
      switchMap(authenticatedUser => API.graphql(graphqlOperation(mutations.createUser, {
        input: {
          name: authenticatedUser.name,
          pictureUrl: authenticatedUser.picture,
        }
      }))),
      map(response => fetchProfileSuccess(response.data.createUser)),
      catchError(error => fetchProfileFail(error)),
    );
}

function signOut(actions$) {
  return actions$
    .pipe(
      ofType(SIGN_OUT),
      switchMap(() => from(Auth.signOut())),
      map(() => signOutSuccess()),
      catchError(error => signOutFail(error)),
    );
}

export default [fetchUsers, fetchProfile, createProfile, signOut];