import { combineReducers } from "redux";

import activitiesReducer, { State as ActivitiesState } from "./activities.reducer";
import authReducer, { State as AuthState } from "./auth.reducer";
import usersReducer, { State as UsersState } from "./users.reducer";
import notificationsReducer, { State as NotificationsState } from "./notifications.reducer";

export interface State {
  activities: ActivitiesState;
  auth: AuthState;
  users: UsersState;
  notifications: NotificationsState;
}

export default combineReducers({
  activities: activitiesReducer,
  users: usersReducer,
  auth: authReducer,
  notifications: notificationsReducer
});
