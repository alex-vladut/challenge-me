import { API, graphqlOperation } from "aws-amplify";
import { ofType, ActionsObservable } from "redux-observable";
import { from, of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import { ActionWithPayload, Action } from "../actions/actions";
import { createNotification } from "../../shared/notifications";
import {
  Create,
  CreateFail,
  CreateSuccess,
  FetchAll,
  FetchAllSuccess,
  FetchAllFail,
  Delete,
  DeleteSuccess,
  DeleteFail,
  Accept,
  AcceptSuccess,
  AcceptFail,
  Reject,
  RejectSuccess,
  RejectFail,
  FetchActivity,
  FetchActivitySuccess,
  FetchActivityFail
} from "../actions/activities.actions";

const createActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Create.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.createActivity, { input: payload }))).pipe(
        map(() => CreateSuccess.create("Your activity was successfully created!")),
        catchError(() => of(CreateFail.create("There was an error while creating your activity. Please try again.")))
      )
    )
  );

const deleteActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Delete.type),
    switchMap(({ payload }) =>
      from(
        API.graphql(
          graphqlOperation(mutations.deleteActivity, { input: { id: payload.id, expectedVersion: payload.version } })
        )
      ).pipe(
        map(() => DeleteSuccess.create("Your activity was successfully removed!")),
        catchError(() =>
          of(DeleteFail.create("There was an error while attempting to delete your activity. Please try again."))
        )
      )
    )
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
    )
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
    )
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
    )
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
    )
  ).pipe(
    map(() =>
      RejectSuccess.create("Sad to hear that :(. We will let the owner know and you won't join this activity.")
    ),
    catchError(() =>
      of(RejectFail.create("There was an error while attempting to reject this activity. Please try again."))
    )
  );

const fetchActivity = (actions$: ActionsObservable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(FetchActivity.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(queries.getActivity, { id: payload }))).pipe(
        map(({ data }: any) => FetchActivitySuccess.create(data.getActivity)),
        catchError(() => of(FetchActivityFail.create("Sorry, there was an error while loading the activity :(")))
      )
    )
  );

const fetchActivities = (actions$: Observable<Action>) =>
  actions$.pipe(
    ofType(FetchAll.type, DeleteSuccess.type),
    switchMap(() => {
      const location = { lat: 46.7712101, lon: 23.623635299999933 };
      return from(API.graphql(graphqlOperation(queries.nearbyActivities, { location, km: 10 }))).pipe(
        map(({ data }: any) => FetchAllSuccess.create(data.nearbyActivities.items)),
        catchError(() => of(FetchAllFail.create("Sorry, there was an error while loading the activities.")))
      );
    })
  );

const actionSucceeded = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(CreateSuccess.type, DeleteSuccess.type, AcceptSuccess.type, RejectSuccess.type),
    switchMap(({ payload }) => of(createNotification(payload, "success")))
  );

const actionFailed = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(FetchAllFail.type, CreateFail.type, AcceptFail.type, RejectFail.type, DeleteFail.type),
    switchMap(({ payload }) => of(createNotification(payload)))
  );

export default [
  createActivity,
  acceptActivity,
  deleteActivity,
  rejectActivity,
  fetchActivity,
  fetchActivities,
  actionSucceeded,
  actionFailed
];
