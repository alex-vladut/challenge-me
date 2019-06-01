import { combineEpics } from 'redux-observable';

import allChallengesEffects from './challenges.epics';
import allUsersEffects from './users.epics';

export const rootEpic = combineEpics(...allChallengesEffects, ...allUsersEffects);