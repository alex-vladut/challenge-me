import { API, graphqlOperation } from "aws-amplify";
import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as queries from "../../graphql-api/queries";
import { ActionWithPayload } from "../actions/actions";
import { FetchUsers, FetchUsersSuccess, FetchUsersFail } from "../actions/users.actions";

function fetchUsers(actions$: Observable<ActionWithPayload<any>>) {
  return actions$.pipe(
    ofType(FetchUsers.type),
    switchMap(({ payload }) =>
      from(
        API.graphql(
          graphqlOperation(queries.listUsers, {
            limit: 100,
            filter: payload ? { name: { contains: payload } } : undefined
          })
        ) as Promise<any>
      ).pipe(
        map((response: any) => FetchUsersSuccess.create(response.data.listUsers.items)),
        catchError(error => of(FetchUsersFail.create(error)))
      )
    )
  );
}

export default [fetchUsers];
