import { API, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as queries from "../../graphql/queries";
import { FetchUsers, FetchUsersSuccess, FetchUsersFail } from "../actions/users.actions";

function fetchUsers(actions$) {
  return actions$.pipe(
    ofType(FetchUsers.type),
    switchMap(({ payload }) =>
      from(
        API.graphql(
          graphqlOperation(queries.listUsers, {
            limit: 100,
            filter: payload ? { name: { contains: payload } } : undefined
          })
        ).pipe(
          map(response => FetchUsersSuccess.create(response.data.listUsers.items)),
          catchError(error => FetchUsersFail.create(error))
        )
      )
    )
  );
}

export default [fetchUsers];
