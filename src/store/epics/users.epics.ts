import { API, graphqlOperation } from "aws-amplify";
import { ActionsObservable, ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";

import * as queries from "../../graphql-api/queries";
import { ActionWithPayload } from "../actions/actions";
import { FetchUser, FetchUserFail, FetchUserSuccess } from "../actions/users.actions";
import { State } from "../reducers";

const fetchUser = (actions$: ActionsObservable<ActionWithPayload<string>>, store$: Observable<State>) =>
  actions$.pipe(
    ofType(FetchUser.type),
    withLatestFrom(store$.pipe(map(({ users }) => users.userId))),
    switchMap(([_, userId]: any[]) =>
      from(API.graphql(graphqlOperation(queries.getUserRead, { id: userId })) as Promise<any>).pipe(
        map(({ data }: any) => FetchUserSuccess.create(data.getUser)),
        catchError((error: any) => of(FetchUserFail.create(error)))
      )
    )
  );

export default [fetchUser];
