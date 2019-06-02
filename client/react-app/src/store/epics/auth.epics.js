import { API, Auth, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {
  FetchProfile,
  FetchProfileFail,
  FetchProfileNotFound,
  FetchProfileSuccess,
  SignOut,
  SignOutFail,
  SignOutSuccess,
} from '../actions/auth.actions';

function fetchProfile(actions$) {
  return actions$
    .pipe(
      ofType(FetchProfile.type),
      switchMap(() => from(Auth.currentAuthenticatedUser())),
      switchMap(authenticatedUser => API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.id }))),
      map(response => response.data.getUser ? FetchProfileSuccess.create(response.data.getUser) : FetchProfileNotFound.create()),
      catchError(error => FetchProfileFail.create(error)),
    );
}

function createProfile(actions$) {
  return actions$
    .pipe(
      ofType(FetchProfileNotFound.type),
      switchMap(() => from(Auth.currentAuthenticatedUser())),
      switchMap(authenticatedUser => API.graphql(graphqlOperation(mutations.createUser, {
        input: {
          name: authenticatedUser.name,
          pictureUrl: authenticatedUser.picture,
        }
      }))),
      map(response => FetchProfileSuccess.create(response.data.createUser)),
      catchError(error => FetchProfileFail.create(error)),
    );
}

function signOut(actions$) {
  return actions$
    .pipe(
      ofType(SignOut.type),
      switchMap(() => from(Auth.signOut())),
      map(() => SignOutSuccess.create()),
      catchError(error => SignOutFail.create(error)),
    );
}

export default [fetchProfile, createProfile, signOut];
