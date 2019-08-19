import { API, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as mutations from '../../graphql/mutations';
import { listActivitys } from '../../graphql/queries';
import { ActionWithPayload, Action } from '../actions/actions';
import { Create, CreateFail, CreateSuccess, Fetch, FetchSuccess, FetchFail } from '../actions/activities.actions';

const createActivity = (actions$: Observable<ActionWithPayload<any>>) => actions$.pipe(
  ofType(Create.type),
  switchMap(({ payload }) => from(API.graphql(graphqlOperation(mutations.createActivity, { input: payload })))),
  map(() => CreateSuccess.create()),
  catchError(error => of(CreateFail.create(error))),
);

const fetchActivities = (actions$: Observable<Action>) => actions$.pipe(
  ofType(Fetch.type),
  switchMap(() => from(API.graphql(graphqlOperation(listActivitys, { limit: 10 })))),
  map(({ data }: any) => FetchSuccess.create(data.listActivitys.items)),
  catchError(error => of(FetchFail.create(error))),
);

export default [createActivity, fetchActivities];