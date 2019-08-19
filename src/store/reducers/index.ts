import { combineReducers } from "redux";

import activitiesReducer, { State as ActivitiesState } from "./activities.reducer";
import challengesReducer, { State as ChallengesState } from "./challenges.reducer";
import authReducer, { State as AuthState } from "./auth.reducer";
import usersReducer, { State as UsersState } from "./users.reducer";

export interface State {
  activities: ActivitiesState;
  challenges: ChallengesState;
  auth: AuthState;
  users: UsersState;
}

export default combineReducers({
  activities: activitiesReducer,
  challenges: challengesReducer,
  users: usersReducer,
  auth: authReducer
});
