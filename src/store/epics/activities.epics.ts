import { API, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import { ActionWithPayload, Action } from "../actions/actions";
import { createNotification } from "../../shared/notifications";
import {
  Create,
  CreateFail,
  CreateSuccess,
  Fetch,
  FetchSuccess,
  FetchFail,
  Delete,
  DeleteSuccess,
  DeleteFail,
  Accept,
  AcceptSuccess,
  AcceptFail,
  Reject,
  RejectSuccess,
  RejectFail
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

const actionSucceeded = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(CreateSuccess.type, DeleteSuccess.type),
    switchMap(({ payload }) => of(createNotification(payload, "success")))
  );

const deleteActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Delete.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.deleteActivity, { input: { id: payload.id, expectedVersion: payload.version } }))).pipe(
        map(() => DeleteSuccess.create("Your activity was successfully removed!")),
        catchError(() => of(DeleteFail.create("There was an error while attempting to delete your activity. Please try again.")))
      )
    )
  );

const acceptActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Accept.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.createParticipation, { input: { participationActivityId: payload.activityId, participationParticipantId: payload.userId } }))).pipe(
        map(() => AcceptSuccess.create()),
        catchError(() => of(AcceptFail.create("There was an error while attempting to accept this activity. Please try again.")))
      )
    )
  );

const rejectActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Reject.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.createParticipation, { input: { participationActivityId: payload.activityId, participationParticipantId: payload.userId } }))).pipe(
        map(() => RejectSuccess.create()),
        catchError(() => of(RejectFail.create("There was an error while attempting to reject this activity. Please try again.")))
      )
    )
  );

const fetchActivities = (actions$: Observable<Action>) =>
  actions$.pipe(
    ofType(Fetch.type, DeleteSuccess.type),
    switchMap(() =>
      from(API.graphql(graphqlOperation(queries.listActivities, { limit: 10 }))).pipe(
        map(({ data }: any) => FetchSuccess.create(data.listActivitys.items)),
        catchError(() => of(FetchFail.create("Sorry, there was an error while loading the activities.")))
      )
    )
  );

const actionFailed = (actions$: Observable<ActionWithPayload<string>>) =>
  actions$.pipe(
    ofType(FetchFail.type, CreateFail.type, AcceptFail.type, RejectFail.type, DeleteFail.type),
    switchMap(({ payload }) => of(createNotification(payload)))
  );

export default [createActivity, acceptActivity, deleteActivity, rejectActivity, fetchActivities, actionSucceeded, actionFailed];
