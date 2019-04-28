import { API, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
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
  rejectChallengeFail,
  rejectChallengeSuccess,
  setChallengeWinnerFail,
  setChallengeWinnerSuccess,
} from '../actions/actions';
import {
  ACCEPT_CHALLENGE,
  CREATE_CHALLENGE,
  FETCH_CHALLENGE,
  FETCH_CHALLENGES,
  REJECT_CHALLENGE,
  SET_CHALLENGE_WINNER,
} from '../actions/actionTypes';

function createChallenge(actions$) {
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
      catchError(error => fetchChallengesFail(error)),
    );
}

function fetchChallenges(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_CHALLENGES),
      switchMap(() => API.graphql(graphqlOperation(queries.listChallenges, { limit: 10 }))),
      map(response => fetchChallengesSuccess(response.data.listChallenges.items)),
      catchError(error => fetchChallengesFail(error))
    );
}

function fetchChallenge(actions$) {
  return actions$
    .pipe(
      ofType(FETCH_CHALLENGE),
      switchMap(({ payload }) => API.graphql(graphqlOperation(queries.getChallenge, { id: payload }))),
      map(response => fetchChallengeSuccess(response.data.getChallenge)),
      catchError(error => fetchChallengeFail(error)),
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

function acceptChallenge(actions$, state$) {
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
      catchError(error => acceptChallengeFail(error)),
    );
}

function rejectChallenge(actions$, state$) {
  return actions$
    .pipe(
      ofType(REJECT_CHALLENGE),
      withLatestFrom(state$),
      switchMap(([{ payload: challenge }, { profile }]) => {
        let challengeToSave = translateChallenge(challenge);
        if (challenge.opponent.id === profile.id) {
          challengeToSave = { ...challengeToSave, refereeStatus: 'ACCEPTED' };
        } else if (challenge.referee.id === profile.id) {
          challengeToSave = { ...challengeToSave, refereeStatus: 'REJECTED' };
        } else {
          throw new Error('You cannot accept or reject this challenge!');
        }
        return API.graphql(graphqlOperation(mutations.updateChallenge, { input: challengeToSave }));
      }),
      map(response => rejectChallengeSuccess(response.data.getChallenge)),
      catchError(error => rejectChallengeFail(error))
    );
}

function setChallengeWinner(actions$) {
  return actions$
    .pipe(
      ofType(SET_CHALLENGE_WINNER),
      switchMap(({ payload }) => API.graphql(graphqlOperation(mutations.updateChallenge,
        { input: { ...translateChallenge(payload.challenge), challengeWinnerId: payload.winner.id } }))),
      map(response => setChallengeWinnerSuccess(response.data.getChallenge)),
      catchError(error => setChallengeWinnerFail(error)),
    );
}

export default [createChallenge, fetchChallenge, fetchChallenges, acceptChallenge, rejectChallenge, setChallengeWinner];