import * as actionTypes from './actions/actionTypes';

export interface State {
  challenges: any[]
  challenge: any
  users: any[]
  profile: any
  loading: boolean
  accepting: boolean
  rejecting: boolean
  error: any
  challengeCreated: boolean
  authenticated: boolean
}

const initialState: State = {
  challenges: [],
  challenge: null,
  users: [],
  loading: false,
  accepting: false,
  rejecting: false,
  error: null,
  challengeCreated: false,
  profile: null,
  authenticated: false
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_CHALLENGES:
    case actionTypes.FETCH_CHALLENGE:
    case actionTypes.FETCH_USERS:
    case actionTypes.CREATE_CHALLENGE:
    case actionTypes.SET_CHALLENGE_WINNER:
    case actionTypes.FETCH_PROFILE:
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ACCEPT_CHALLENGE:
      return {
        ...state,
        accepting: true,
        loading: true
      };
    case actionTypes.REJECT_CHALLENGE:
      return {
        ...state,
        rejecting: true,
        loading: true
      };
    case actionTypes.FETCH_CHALLENGES_SUCCESS:
      return {
        ...state,
        challenges: action.payload,
        loading: false,
        error: null
      };
    case actionTypes.FETCH_CHALLENGE_SUCCESS:
    case actionTypes.SET_CHALLENGE_WINNER_SUCCESS:
      return {
        ...state,
        challenge: action.payload,
        loading: false,
        error: null
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null
      };
    case actionTypes.CREATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        challengeCreated: true
      };
    case actionTypes.ACCEPT_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        accepting: false,
        error: null,
        challenge: action.payload,
      }
    case actionTypes.REJECT_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        rejecting: false,
        error: null,
        challenge: action.payload,
      }
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        authenticated: true,
        loading: false
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        profile: null,
        authenticated: false,
        loading: false
      };
    case actionTypes.FETCH_CHALLENGES_FAIL:
    case actionTypes.FETCH_CHALLENGE_FAIL:
    case actionTypes.FETCH_USERS_FAIL:
    case actionTypes.CREATE_CHALLENGE_FAIL:
    case actionTypes.FETCH_PROFILE_FAIL:
    case actionTypes.SIGN_OUT_FAIL:
      return {
        ...state,
        challenges: [],
        loading: false,
        error: action.error
      };
    case actionTypes.CREATE_CHALLENGE_INIT:
      return {
        ...state,
        challengeCreated: false
      };
    default:
      return state;
  }
};

export default reducer;