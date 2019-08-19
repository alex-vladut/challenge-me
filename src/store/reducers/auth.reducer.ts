import { FetchProfile, FetchProfileFail, FetchProfileSuccess, SignOut, SignOutFail, SignOutSuccess } from "../actions/auth.actions";

export interface State {
  loading: boolean;
  authenticated: boolean;
  profile: any;
}

const initialState: State = {
  loading: false,
  authenticated: false,
  profile: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FetchProfile.type:
    case SignOut.type:
      return {
        ...state,
        loading: true
      };
    case FetchProfileSuccess.type:
      return {
        ...state,
        profile: action.payload,
        authenticated: true,
        loading: false
      };
    case SignOutSuccess.type:
      return {
        ...state,
        profile: null,
        authenticated: false,
        loading: false
      };
    case FetchProfileFail.type:
    case SignOutFail.type:
      return {
        ...state,
        challenges: [],
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
