import { combineReducers } from 'redux';

import challengesReducer from './challenges.reducer';

export default combineReducers({
  challenges: challengesReducer
});