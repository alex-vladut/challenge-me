import { combineEpics } from 'redux-observable';

import allAuthEpics from './auth.epics';
import allChallengesEpics from './challenges.epics';
import allUsersEpics from './users.epics';

export const rootEpic = combineEpics(...allChallengesEpics, ...allUsersEpics, ...allAuthEpics);