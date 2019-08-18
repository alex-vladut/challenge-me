import { API, graphqlOperation } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {
  FetchChallenges,
  FetchChallengesSuccess,
  FetchChallengesFail,
  FetchChallenge,
  FetchChallengeFail,
  FetchChallengeSuccess,
  AcceptChallenge,
  AcceptChallengeFail,
  AcceptChallengeSuccess,
  RejectChallenge,
  RejectChallengeFail,
  RejectChallengeSuccess,
  SetChallengeWinner,
  SetChallengeWinnerFail,
  SetChallengeWinnerSuccess,
  CreateChallenge,
  CreateChallengeSuccess,
  CreateChallengeFail,
} from '../actions/challenges.actions';

function createChallenge(actions$) {
  return actions$
    .pipe(
      ofType(CreateChallenge.type),
      switchMap(({ payload: challenge }) => {
        const challengeToSave = {
          title: challenge.title,
          description: challenge.description,
          deadline: challenge.deadline,
          challengeOpponentId: challenge.opponent,
          challengeRefereeId: challenge.referee,
        }
        return API.graphql(graphqlOperation(mutations.createChallenge, { input: challengeToSave }))
      }),
      map(response => CreateChallengeSuccess.create({ challenge: response.data.createChallenge })),
      catchError(error => CreateChallengeFail.create(error)),
    );
}

function fetchChallenges(actions$) {
  return actions$
    .pipe(
      ofType(FetchChallenges.type),
      switchMap(() => API.graphql(graphqlOperation(queries.listChallenges, { limit: 10 }))),
      map(response => FetchChallengesSuccess.create(response.data.listChallenges.items)),
      catchError(error => FetchChallengesFail.create(error))
    );
}

function fetchChallenge(actions$) {
  return actions$
    .pipe(
      ofType(FetchChallenge.type),
      switchMap(({ payload }) => API.graphql(graphqlOperation(queries.getChallenge, { id: payload }))),
      map(response => FetchChallengeSuccess.create(response.data.getChallenge)),
      catchError(error => FetchChallengeFail.create(error)),
    );
}

const translateChallenge = challenge => ({
  id: challenge.id,
  challengeOwnerId: challenge.owner.id,
  title: challenge.title,
  description: challenge.description,
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
      ofType(AcceptChallenge.type),
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
      map(response => AcceptChallengeSuccess.create(response.data.getChallenge)),
      catchError(error => AcceptChallengeFail.create(error)),
    );
}

function rejectChallenge(actions$, state$) {
  return actions$
    .pipe(
      ofType(RejectChallenge.type),
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
      map(response => RejectChallengeSuccess.create(response.data.getChallenge)),
      catchError(error => RejectChallengeFail.create(error))
    );
}

function setChallengeWinner(actions$) {
  return actions$
    .pipe(
      ofType(SetChallengeWinner.type),
      switchMap(({ payload }) => API.graphql(graphqlOperation(mutations.updateChallenge,
        { input: { ...translateChallenge(payload.challenge), challengeWinnerId: payload.winner.id } }))),
      map(response => SetChallengeWinnerSuccess.create(response.data.getChallenge)),
      catchError(error => SetChallengeWinnerFail.create(error)),
    );
}

export default [createChallenge, fetchChallenge, fetchChallenges, acceptChallenge, rejectChallenge, setChallengeWinner];