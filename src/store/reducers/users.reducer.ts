import { ActionWithPayload } from "../actions/actions";
import { FetchUser, FetchUserSuccess, FetchUserFail } from "../actions/users.actions";

export interface State {
  loading: boolean;
  userId: string | null;
  user: any;
}

const initialState: State = {
  loading: false,
  userId: null,
  user: null
};

const reducer = (state = initialState, action: ActionWithPayload<any>) => {
  switch (action.type) {
    case FetchUser.type:
      return { ...state, userId: action.payload, loading: true };
    case FetchUserSuccess.type:
      return { ...state, user: action.payload, loading: false };
    case FetchUserFail.type:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
