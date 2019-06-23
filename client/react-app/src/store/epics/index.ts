import { combineEpics } from 'redux-observable';

import activitiesEpics from './activities.epics';
import authEpics from './auth.epics';
import challengesEpics from './challenges.epics';
import usersEpics from './users.epics';

export const rootEpic = combineEpics(...activitiesEpics, ...challengesEpics, ...usersEpics, ...authEpics);