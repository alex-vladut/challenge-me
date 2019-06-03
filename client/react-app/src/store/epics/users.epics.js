import { API, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as queries from '../../graphql/queries';
import { FETCH_USERS } from '../actions/users.types';
import { fetchUsersFail, fetchUsersSuccess } from '../actions/users.actions';

function fetchUsers(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_USERS),
      switchMap(() => from(API.graphql(graphqlOperation(queries.listUsers, { limit: 10 })))),
      map(response => fetchUsersSuccess(response.data.listUsers.items)),
      catchError(error => fetchUsersFail(error)),
    );
}

export default [fetchUsers];