import { API, Auth, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as queries from "../../graphql-api/queries";
import { FetchProfile, FetchProfileFail, FetchProfileNotFound, FetchProfileSuccess, SignOut, SignOutFail, SignOutSuccess } from "../actions/auth.actions";

const fetchProfile = (actions$: any) => actions$.pipe(
  ofType(FetchProfile.type),
  switchMap(() => from(Auth.currentAuthenticatedUser())),
  switchMap((authenticatedUser: any) =>
    from(API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.username }))).pipe(
      map((response: any) => (response.data.getUser ? FetchProfileSuccess.create(response.data.getUser) : FetchProfileNotFound.create())),
      catchError(error => of(FetchProfileFail.create(error)))
    )
  )
);

const signOut = (actions$: any) => actions$.pipe(
  ofType(SignOut.type),
  switchMap(() =>
    from(Auth.signOut()).pipe(
      map(() => SignOutSuccess.create()),
      catchError(error => of(SignOutFail.create(error)))
    )
  )
);

export default [fetchProfile, signOut];
