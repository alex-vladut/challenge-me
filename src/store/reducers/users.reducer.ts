import { FetchUsers, FetchUsersFail, FetchUsersSuccess } from "../actions/users.actions";

export interface State {
  loading: boolean;
  users: any[];
}

const initialState: State = {
  loading: false,
  users: []
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FetchUsers.type:
      return { ...state, loading: true };
    case FetchUsersSuccess.type:
      return { ...state, users: action.payload, loading: false };
    case FetchUsersFail.type:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
