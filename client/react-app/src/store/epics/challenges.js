import { API, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {
  acceptChallengeFail,
  acceptChallengeSuccess,
  createChallengeSuccess,
  fetchChallengeFail,
  fetchChallengesFail,
  fetchChallengesSuccess,
  fetchChallengeSuccess,
} from '../actions/actions';
import { ACCEPT_CHALLENGE, CREATE_CHALLENGE, FETCH_CHALLENGE, FETCH_CHALLENGES } from '../actions/actionTypes';

export function createChallenge(actions$) {
  return actions$
    .pipe(
      ofType(CREATE_CHALLENGE),
      switchMap(({ payload: challenge }) => {
        const challengeToSave = {
          title: challenge.title,
          deadline: challenge.deadline,
          challengeOpponentId: challenge.opponent,
          challengeRefereeId: challenge.referee,
        }
        return API.graphql(graphqlOperation(mutations.createChallenge, { input: challengeToSave }))
      }),
      map(response => createChallengeSuccess({ challenge: response.data.createChallenge })),
      catchError(error => Observable.of(fetchChallengesFail(error)))
    );
}

export function fetchChallenges(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_CHALLENGES),
      switchMap(() => API.graphql(graphqlOperation(queries.listChallenges, { limit: 10 }))),
      map(response => fetchChallengesSuccess(response.data.listChallenges.items)),
      catchError(error => Observable.of(fetchChallengesFail(error)))
    );
}

export function fetchChallenge(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_CHALLENGE),
      switchMap(({ payload }) => API.graphql(graphqlOperation(queries.getChallenge, { id: payload }))),
      map(response => fetchChallengeSuccess(response.data.getChallenge)),
      catchError(error => Observable.of(fetchChallengeFail(error)))
    );
}

const translateChallenge = challenge => ({
  id: challenge.id,
  challengeOwnerId: challenge.owner.id,
  title: challenge.title,
  deadline: challenge.deadline,
  challengeOpponentId: challenge.opponent.id,
  opponentStatus: challenge.opponentStatus,
  challengeRefereeId: challenge.referee.id,
  refereeStatus: challenge.refereeStatus,
  expectedVersion: challenge.version
});

export function acceptChallenge(actions$, state$) {
  return actions$
    .pipe(
      ofType(ACCEPT_CHALLENGE),
      withLatestFrom(state$),
      switchMap(([{ payload: challenge }, { profile }]) => {
        let challengeToSave = translateChallenge(challenge);
        if (challenge.opponent.id === profile.id) {
          challengeToSave = { ...challengeToSave, opponentStatus: 'ACCEPTED' };
        } else if (challenge.referee.id === profile.id) {
          challengeToSave = { ...challengeToSave, refereeStatus: 'ACCEPTED' };
        } else {
          throw new Error('You cannot accept or reject this challenge!');
        }
        return API.graphql(graphqlOperation(mutations.updateChallenge, { input: challengeToSave }));
      }),
      map(response => acceptChallengeSuccess(response.data.getChallenge)),
      catchError(error => Observable.of(acceptChallengeFail(error)))
    );
}