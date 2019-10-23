import {
  Fetch,
  FetchFail,
  FetchLocationSuccess,
  FetchSuccess,
  Save,
  SaveFail,
  SaveSuccess,
  SignOut,
  SignOutFail,
  SignOutSuccess
} from "../actions/auth.actions";

export interface State {
  loading: boolean;
  authenticated: boolean;
  profile: any;
  currentLocation: any;
}

const initialState: State = {
  loading: false,
  authenticated: false,
  profile: null,
  currentLocation: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Fetch.type:
    case SignOut.type:
    case Save.type:
      return {
        ...state,
        loading: true
      };
    case FetchSuccess.type:
    case SaveSuccess.type:
      return {
        ...state,
        profile: action.payload,
        authenticated: true,
        loading: false
      };
    case FetchLocationSuccess.type:
      return {
        ...state,
        currentLocation: action.payload
      };
    case SignOutSuccess.type:
      return {
        ...state,
        profile: null,
        authenticated: false,
        loading: false
      };
    case FetchFail.type:
    case SignOutFail.type:
    case SaveFail.type:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
