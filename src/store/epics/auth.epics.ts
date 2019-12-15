import { API, Auth, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap, takeUntil, withLatestFrom } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import * as subscriptions from "../../graphql-api/subscriptions";
import { createNotification } from "../../shared/notifications";
import { ActionWithPayload } from "../actions/actions";
import {
  Fetch,
  FetchFail,
  FetchLocationSuccess,
  FetchSuccess,
  ParticipationCreatedOrUpdated,
  Save,
  SaveFail,
  SaveSuccess,
  SendMessage,
  SendMessageFail,
  SendMessageSuccess,
  SignOut,
  SignOutFail,
  SignOutSuccess,
  FetchLocationFail
} from "../actions/auth.actions";
import { State } from "../reducers";

const fetchProfile = (actions$: any) =>
  actions$.pipe(
    ofType(Fetch.type),
    switchMap(() => from(Auth.currentAuthenticatedUser())),
    switchMap((authenticatedUser: any) =>
      from(API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.username })) as Promise<any>).pipe(
        map((response: any) => FetchSuccess.create(response.data.getUser)),
        catchError(error => of(FetchFail.create(error)))
      )
    )
  );

const subscribeOnParticipationCreated = (actions$: any, store$: Observable<State>) =>
  actions$.pipe(
    ofType(FetchSuccess.type),
    withLatestFrom(store$.pipe(map(({ auth }) => auth.profile))),
    switchMap(
      ([_, profile]: any[]) =>
        API.graphql(
          graphqlOperation(subscriptions.onCreateUpdateParticipation, {
            participationParticipantId: profile.id
          })
        ) as Promise<any>
    ),
    map((response: any) => ParticipationCreatedOrUpdated.create(response.value.data.onCreateUpdateParticipation)),
    takeUntil(actions$.pipe(ofType(SignOut.type)))
  );

const fetchLocation = (actions$: any) =>
  actions$.pipe(
    ofType(FetchSuccess.type),
    switchMap(() =>
      from(
        fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBYT5OOBcCAG1GgP7uSB7lMzaUCyXqbCdo", {
          method: "POST"
        })
          .then(response => response.json())
          .then(({ location }) =>
            FetchLocationSuccess.create({
              location: { lat: location.lat, lon: location.lng },
              address: "Your current location"
            })
          )
          .catch(error => FetchLocationFail.create(error))
      )
    )
  );

const saveProfile = (actions$: any) =>
  actions$.pipe(
    ofType(Save.type),
    switchMap(({ payload: { id, name, bio, pictureUrl, email, version: expectedVersion } }) =>
      from(
        API.graphql(
          graphqlOperation(mutations.updateUser, { input: { id, name, bio: bio || null, pictureUrl, email, expectedVersion } })
        ) as Promise<any>
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

const sendMessage = (actions$: any) =>
  actions$.pipe(
    ofType(SendMessage.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.sendMessage, { input: payload })) as Promise<any>).pipe(
        map(() => SendMessageSuccess.create({})),
        catchError(error => of(SendMessageFail.create(error)))
      )
    )
  );

const sendMessageSuccessful = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(SendMessageSuccess.type),
    switchMap(() =>
      of(createNotification("Thank you for your messages! Will get back to you as soon as possible.", "success"))
    )
  );

const sendMessageFail = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(SendMessageFail.type),
    switchMap(() =>
      of(createNotification("Sorry, there was an error while sending your message. Please try again later."))
    )
  );

export default [
  fetchProfile,
  fetchLocation,
  saveProfile,
  saveProfileSuccessful,
  saveProfileFailed,
  signOut,
  sendMessage,
  sendMessageSuccessful,
  sendMessageFail,
  subscribeOnParticipationCreated
];
