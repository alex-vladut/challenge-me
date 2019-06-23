import { combineReducers } from 'redux';

import activitiesReducer from './activities.reducer';
import challengesReducer from './challenges.reducer';
import authReducer from './auth.reducer';
import usersReducer from './users.reducer';

export default combineReducers({
  activities: activitiesReducer,
  challenges: challengesReducer,
  users: usersReducer,
  auth: authReducer,
});