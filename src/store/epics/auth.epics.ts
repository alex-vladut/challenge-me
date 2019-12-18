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
  DeleteNotification,
  DeleteNotificationFail,
  DeleteNotificationSuccess,
  Fetch,
  FetchFail,
  FetchLocationFail,
  FetchLocationSuccess,
  FetchSuccess,
  MarkNotificationAsRead,
  MarkNotificationAsReadFail,
  MarkNotificationAsReadSuccess,
  MarkNotificationAsUnread,
  MarkNotificationAsUnreadFail,
  MarkNotificationAsUnreadSuccess,
  NotificationCreated,
  NotificationDeleted,
  NotificationUpdated,
  ParticipationCreatedOrUpdated,
  Save,
  SaveFail,
  SaveSuccess,
  SendMessage,
  SendMessageFail,
  SendMessageSuccess,
  SignOut,
  SignOutFail,
  SignOutSuccess
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
          graphqlOperation(mutations.updateUser, {
            input: { id, name, bio: bio || null, pictureUrl, email, expectedVersion }
          })
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

const markNotificationAsRead = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(MarkNotificationAsRead.type),
    switchMap(({ payload }: any) =>
      from(
        API.graphql(
          graphqlOperation(mutations.updateNotification, {
            input: { id: payload.id, read: true, expectedVersion: payload.version }
          })
        ) as Promise<any>
      ).pipe(
        map(() => MarkNotificationAsReadSuccess.create({})),
        catchError(error => of(MarkNotificationAsReadFail.create(error)))
      )
    )
  );

const markNotificationAsUnread = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(MarkNotificationAsUnread.type),
    switchMap(({ payload }: any) =>
      from(
        API.graphql(
          graphqlOperation(mutations.updateNotification, {
            input: { id: payload.id, read: false, expectedVersion: payload.version }
          })
        ) as Promise<any>
      ).pipe(
        map(() => MarkNotificationAsUnreadSuccess.create({})),
        catchError(error => of(MarkNotificationAsUnreadFail.create(error)))
      )
    )
  );

const deleteNotification = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(DeleteNotification.type),
    switchMap(({ payload }: any) =>
      from(
        API.graphql(
          graphqlOperation(mutations.deleteNotification, {
            input: { id: payload.id, expectedVersion: payload.version }
          })
        ) as Promise<any>
      ).pipe(
        map(() => DeleteNotificationSuccess.create({})),
        catchError(error => of(DeleteNotificationFail.create(error)))
      )
    )
  );

const subscribeOnParticipationCreatedOrUpdated = (actions$: any, store$: Observable<State>) =>
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

const subscribeOnNotificationCreated = (actions$: any, store$: Observable<State>) =>
  actions$.pipe(
    ofType(FetchSuccess.type),
    withLatestFrom(store$.pipe(map(({ auth }) => auth.profile))),
    switchMap(
      ([_, profile]: any[]) =>
        API.graphql(
          graphqlOperation(subscriptions.onCreateNotification, {
            notificationUserId: profile.id
          })
        ) as Promise<any>
    ),
    map((response: any) => NotificationCreated.create(response.value.data.onCreateNotification)),
    takeUntil(actions$.pipe(ofType(SignOut.type)))
  );

const subscribeOnNotificationUpdated = (actions$: any, store$: Observable<State>) =>
  actions$.pipe(
    ofType(FetchSuccess.type),
    withLatestFrom(store$.pipe(map(({ auth }) => auth.profile))),
    switchMap(
      ([_, profile]: any[]) =>
        API.graphql(
          graphqlOperation(subscriptions.onUpdateNotification, {
            notificationUserId: profile.id
          })
        ) as Promise<any>
    ),
    map((response: any) => NotificationUpdated.create(response.value.data.onUpdateNotification)),
    takeUntil(actions$.pipe(ofType(SignOut.type)))
  );

const subscribeOnNotificationDeleted = (actions$: any, store$: Observable<State>) =>
  actions$.pipe(
    ofType(FetchSuccess.type),
    withLatestFrom(store$.pipe(map(({ auth }) => auth.profile))),
    switchMap(
      ([_, profile]: any[]) =>
        API.graphql(
          graphqlOperation(subscriptions.onDeleteNotification, {
            notificationUserId: profile.id
          })
        ) as Promise<any>
    ),
    map((response: any) => NotificationDeleted.create(response.value.data.onDeleteNotification)),
    takeUntil(actions$.pipe(ofType(SignOut.type)))
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
  markNotificationAsRead,
  markNotificationAsUnread,
  deleteNotification,
  subscribeOnParticipationCreatedOrUpdated,
  subscribeOnNotificationCreated,
  subscribeOnNotificationUpdated,
  subscribeOnNotificationDeleted
];
