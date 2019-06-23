import { ofType } from 'redux-observable';
import { of, from } from 'rxjs';
import * as mutations from '../../graphql/mutations';
import { switchMap, map, catchError } from 'rxjs/operators';
import { API, graphqlOperation } from 'aws-amplify';

import { CreateActivity, CreateActivitySuccess, CreateActivityFail } from '../actions/activities.actions';

const createActivity = actions$ => actions$.pipe(
  ofType(CreateActivity.type),
  switchMap(({ payload }) => from(API.graphql(graphqlOperation(mutations.createActivity, { input: payload })))),
  map(() => CreateActivitySuccess.create()),
  catchError(error => of(CreateActivityFail.create(error))),
)

export default [createActivity];