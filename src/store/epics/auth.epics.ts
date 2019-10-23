import { API, Auth, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import { createNotification } from "../../shared/notifications";
import { ActionWithPayload } from "../actions/actions";
import {
  Fetch,
  FetchFail,
  FetchLocationSuccess,
  FetchSuccess,
  Save,
  SaveFail,
  SaveSuccess,
  SignOut,
  SignOutFail,
  SignOutSuccess
} from "../actions/auth.actions";

const DEFAULT_LOCATION = {
  location: { lat: 46.7712101, lon: 23.623635299999933 },
  address: "Cluj-Napoca, Romania"
};

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

const fetchLocation = (actions$: any) =>
  actions$.pipe(
    ofType(FetchSuccess.type),
    switchMap(() =>
      from(
        new Promise(resolve =>
          navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
              resolve(
                FetchLocationSuccess.create({
                  location: { lat: coords.latitude, lon: coords.longitude },
                  address: "Your current location"
                })
              ),
            () => resolve(FetchLocationSuccess.create(DEFAULT_LOCATION))
          )
        )
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

export default [fetchProfile, fetchLocation, saveProfile, saveProfileSuccessful, saveProfileFailed, signOut];
