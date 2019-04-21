import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { API, graphqlOperation } from 'aws-amplify';
import { Observable } from 'rxjs';

import * as queries from '../../graphql/queries';
import { fetchChallengesFail, fetchChallengesSuccess } from '../actions/actions';
import { FETCH_CHALLENGES } from '../actions/actionTypes';

export function fetchChallenges(actions$) {
  return actions$
    .ofType(FETCH_CHALLENGES)
    .switchMap(() => API.graphql(graphqlOperation(queries.listChallenges, { limit: 10 })))
    .map(response => fetchChallengesSuccess(response.data.listChallenges.items))
    .catch(error => Observable.of(fetchChallengesFail(error)))
}