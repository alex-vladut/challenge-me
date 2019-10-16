import { API, Auth, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as queries from "../../graphql-api/queries";
import * as mutations from "../../graphql-api/mutations";
import {
  Fetch,
  FetchFail,
  FetchSuccess,
  SignOut,
  SignOutFail,
  SignOutSuccess,
  Save,
  SaveSuccess,
  SaveFail
} from "../actions/auth.actions";
import { ActionWithPayload } from "../actions/actions";
import { createNotification } from "../../shared/notifications";

const fetchProfile = (actions$: any) =>
  actions$.pipe(
    ofType(Fetch.type),
    switchMap(() => from(Auth.currentAuthenticatedUser())),
    switchMap((authenticatedUser: any) =>
      from(API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.username }))).pipe(
        map((response: any) => FetchSuccess.create(response.data.getUser)),
        catchError(error => of(FetchFail.create(error)))
      )
    )
  );

const saveProfile = (actions$: any) =>
  actions$.pipe(
    ofType(Save.type),
    switchMap(({ payload: { id, name, pictureUrl, email, version: expectedVersion } }) =>
      from(
        API.graphql(graphqlOperation(mutations.updateUser, { input: { id, name, pictureUrl, email, expectedVersion } }))
      ).pipe(
        map((response: any) => SaveSuccess.create(response.data.updateUser)),
        catchError(error => of(SaveFail.create(error)))
      )
    )
  );

const saveProfileSuccessful = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(SaveSuccess.type),
    switchMap(() => of(createNotification("Your profile was saved successfully!", "success")))
  );

const saveProfileFailed = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(SaveFail.type),
    switchMap(() =>
      of(createNotification("Ooops! There was an error while saving your profile. Please try again.", "error"))
    )
  );

const signOut = (actions$: any) =>
  actions$.pipe(
    ofType(SignOut.type),
    switchMap(() =>
      from(Auth.signOut()).pipe(
        map(() => SignOutSuccess.create()),
        catchError(error => of(SignOutFail.create(error)))
      )
    )
  );

export default [fetchProfile, saveProfile, saveProfileSuccessful, saveProfileFailed, signOut];
