import { combineEpics } from 'redux-observable';
import { createChallenge, fetchChallenges, fetchChallenge, acceptChallenge } from './challenges';

export const rootEpic = combineEpics(createChallenge, fetchChallenges, fetchChallenge, acceptChallenge);