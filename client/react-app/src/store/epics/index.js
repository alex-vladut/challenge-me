import { combineEpics } from 'redux-observable';

import allChallengesEffects from './challenges.effects';
import allUsersEffects from './users.effects';

export const rootEpic = combineEpics(...allChallengesEffects, ...allUsersEffects);