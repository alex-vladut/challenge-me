import { combineEpics } from 'redux-observable';
import { fetchChallenges } from './challenges';

export const rootEpic = combineEpics(fetchChallenges);