import { combineReducers } from 'redux';

import challengesReducer from './challenges.reducer';
import authReducer from './auth.reducer';

export default combineReducers({
  challenges: challengesReducer,
  auth: authReducer,
});