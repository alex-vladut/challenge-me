import { API, graphqlOperation } from "aws-amplify";
import { ActionsObservable, ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import { createNotification } from "../../shared/notifications";
import { Action, ActionWithPayload } from "../actions/actions";
import {
  Accept,
  AcceptFail,
  AcceptSuccess,
  Create,
  CreateFail,
  CreateComment,
  CreateCommentFail,
  CreateCommentSuccess,
  CreateSuccess,
  Delete,
  DeleteFail,
  DeleteSuccess,
  FetchActivityFail,
  FetchActivitySuccess,
  FetchAll,
  FetchAllFail,
  FetchAllSuccess,
  Reject,
  RejectFail,
  RejectSuccess,
  SetActivityId
} from "../actions/activities.actions";
import { State } from "../reducers";

const createActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Create.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.createActivity, { input: payload })) as Promise<any>).pipe(
        map((response: any) => CreateSuccess.create(response.data.createActivity)),
        catchError(error => of(CreateFail.create(error)))
      )
    )
  );

const createActivitySuccessful = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(CreateSuccess.type),
    map(() => createNotification("Your activity was successfully created!", "success"))
  );

const createActivityFailed = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(CreateFail.type),
    map(() => createNotification("There was an error while creating your activity. Please try again."))
  );

const deleteActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Delete.type),
    switchMap(({ payload }) =>
      from(
        API.graphql(
          graphqlOperation(mutations.deleteActivity, { input: { id: payload.id, expectedVersion: payload.version } })
        ) as Promise<any>
      ).pipe(
        map((response: any) => DeleteSuccess.create(response.data.deleteActivity)),
        catchError(error => of(DeleteFail.create(error)))
      )
    )
  );

const deleteActivitySuccessful = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(DeleteSuccess.type),
    map(() => createNotification("Your activity was successfully removed!", "success"))
  );

const deleteActivityFailed = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(DeleteFail.type),
    map(() => createNotification("There was an error while attempting to delete your activity. Please try again."))
  );

const acceptActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Accept.type),
    switchMap(({ payload }) =>
      payload.id ? updateAcceptedParticipation(payload) : createAcceptedParticipation(payload)
    )
  );

const createAcceptedParticipation = (payload: any) =>
  from(
    API.graphql(
      graphqlOperation(mutations.createParticipation, {
        input: {
          participationActivityId: payload.activityId,
          participationParticipantId: payload.userId,
          status: "ACCEPTED"
        }
      })
    ) as Promise<any>
  ).pipe(
    map(() => AcceptSuccess.create("Great news! We will inform the owner that you will join this activity :)")),
    catchError(() =>
      of(AcceptFail.create("There was an error while attempting to accept this activity. Please try again."))
    )
  );

const updateAcceptedParticipation = (payload: any) =>
  from(
    API.graphql(
      graphqlOperation(mutations.updateParticipation, {
        input: { id: payload.id, status: "ACCEPTED", expectedVersion: payload.version }
      })
    ) as Promise<any>
  ).pipe(
    map(() =>
      AcceptSuccess.create(
        "Great news! We will inform the owner that you changed your mind and will join this activity :)"
      )
    ),
    catchError(() =>
      of(AcceptFail.create("There was an error while attempting to accept this activity. Please try again."))
    )
  );

const rejectActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Reject.type),
    switchMap(({ payload }) =>
      payload.id ? updateRejectedParticipation(payload) : createRejectedParticipation(payload)
    )
  );

const createRejectedParticipation = (payload: any) =>
  from(
    API.graphql(
      graphqlOperation(mutations.createParticipation, {
        input: {
          participationActivityId: payload.activityId,
          participationParticipantId: payload.userId,
          status: "REJECTED"
        }
      })
    ) as Promise<any>
  ).pipe(
    map(() =>
      RejectSuccess.create("Sad to hear that :(. We will let the owner know and you won't join this activity.")
    ),
    catchError(() =>
      of(RejectFail.create("There was an error while attempting to reject this activity. Please try again."))
    )
  );

const updateRejectedParticipation = (payload: any) =>
  from(
    API.graphql(
      graphqlOperation(mutations.updateParticipation, {
        input: { id: payload.id, status: "REJECTED", expectedVersion: payload.version }
      })
    ) as Promise<any>
  ).pipe(
    map(() =>
      RejectSuccess.create("Sad to hear that :(. We will let the owner know and you won't join this activity.")
    ),
    catchError(() =>
      of(RejectFail.create("There was an error while attempting to reject this activity. Please try again."))
    )
  );

const fetchActivity = (actions$: ActionsObservable<ActionWithPayload<string>>, store$: Observable<State>) =>
  actions$.pipe(
    ofType(SetActivityId.type, AcceptSuccess.type, RejectSuccess.type, CreateCommentSuccess.type),
    withLatestFrom(store$.pipe(map(({ activities }) => activities.activityId))),
    switchMap(([_, activityId]: any[]) =>
      from(API.graphql(graphqlOperation(queries.getActivity, { id: activityId })) as Promise<any>).pipe(
        map(({ data }: any) => FetchActivitySuccess.create(data.getActivity)),
        catchError(() => of(FetchActivityFail.create("Sorry, there was an error while loading the activity :(")))
      )
    )
  );

const fetchActivities = (actions$: Observable<Action>, store$: Observable<State>) =>
  actions$.pipe(
    ofType(FetchAll.type, DeleteSuccess.type),
    withLatestFrom(store$.pipe(map(({ activities }) => activities.filters))),
    switchMap(([_, filters]: any[]) =>
      from(
        API.graphql(graphqlOperation(queries.nearbyActivities, { location: filters.location, km: 50 })) as Promise<any>
      ).pipe(
        map(({ data }: any) => FetchAllSuccess.create(data.nearbyActivities.items)),
        catchError(() => of(FetchAllFail.create("Sorry, there was an error while loading the activities.")))
      )
    )
  );

const createMessage = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(CreateComment.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.createComment, { input: payload })) as Promise<any>).pipe(
        map(({ data }: any) => CreateCommentSuccess.create(data.createMessage)),
        catchError((error: any) => of(CreateCommentFail.create(error)))
      )
    )
  );

const actionSucceeded = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(AcceptSuccess.type, RejectSuccess.type),
    switchMap(({ payload }) => of(createNotification(payload, "success")))
  );

const actionFailed = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(AcceptFail.type, RejectFail.type, DeleteFail.type),
    switchMap(({ payload }) => of(createNotification(payload)))
  );

export default [
  createActivity,
  createActivitySuccessful,
  createActivityFailed,
  acceptActivity,
  deleteActivity,
  deleteActivitySuccessful,
  deleteActivityFailed,
  rejectActivity,
  fetchActivity,
  fetchActivities,
  actionSucceeded,
  actionFailed,
  createMessage
];
