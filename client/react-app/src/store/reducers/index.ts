import { combineReducers } from 'redux';

import challengesReducer from './challenges.reducer';
import authReducer from './auth.reducer';
import usersReducer from './users.reducer';

export default combineReducers({
  challenges: challengesReducer,
  users: usersReducer,
  auth: authReducer,
});