import { API, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as mutations from "../../graphql-api/mutations";
import * as queries from "../../graphql-api/queries";
import { ActionWithPayload, Action } from "../actions/actions";
import { Create, CreateFail, CreateSuccess, Fetch, FetchSuccess, FetchFail, Delete, DeleteSuccess, DeleteFail } from "../actions/activities.actions";

const createActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Create.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.createActivity, { input: payload }))).pipe(
        map(() => CreateSuccess.create()),
        catchError(() => of(CreateFail.create("There was an error while creating your activity. Please try again.")))
      )
    )
  );

const deleteActivity = (actions$: Observable<ActionWithPayload<any>>) =>
  actions$.pipe(
    ofType(Delete.type),
    switchMap(({ payload }) =>
      from(API.graphql(graphqlOperation(mutations.deleteActivity, { input: { id: payload.id, expectedVersion: payload.version } }))).pipe(
        map(() => DeleteSuccess.create()),
        catchError(() => of(DeleteFail.create("There was an error while attempting to delete your activity. Please try again.")))
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

export default [createActivity, deleteActivity, fetchActivities];
