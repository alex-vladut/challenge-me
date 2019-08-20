import { API, Auth, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import { FetchProfile, FetchProfileFail, FetchProfileNotFound, FetchProfileSuccess, SignOut, SignOutFail, SignOutSuccess } from "../actions/auth.actions";

function fetchProfile(actions$: any) {
  return actions$.pipe(
    ofType(FetchProfile.type),
    switchMap(() => from(Auth.currentAuthenticatedUser())),
    switchMap((authenticatedUser: any) =>
      from(API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.id }))).pipe(
        map((response: any) => (response.data.getUser ? FetchProfileSuccess.create(response.data.getUser) : FetchProfileNotFound.create())),
        catchError(error => of(FetchProfileFail.create(error)))
      )
    )
  );
}

function createProfile(actions$: any) {
  return actions$.pipe(
    ofType(FetchProfileNotFound.type),
    switchMap(() => from(Auth.currentAuthenticatedUser())),
    switchMap((authenticatedUser: any) =>
      from(
        API.graphql(
          graphqlOperation(mutations.createUser, {
            input: {
              name: authenticatedUser.name,
              pictureUrl: authenticatedUser.picture
            }
          })
        )
      ).pipe(
        map((response: any) => FetchProfileSuccess.create(response.data.createUser)),
        catchError(error => of(FetchProfileFail.create(error)))
      )
    )
  );
}

function signOut(actions$: any) {
  return actions$.pipe(
    ofType(SignOut.type),
    switchMap(() =>
      from(Auth.signOut()).pipe(
        map(() => SignOutSuccess.create()),
        catchError(error => of(SignOutFail.create(error)))
      )
    )
  );
}

export default [fetchProfile, createProfile, signOut];
