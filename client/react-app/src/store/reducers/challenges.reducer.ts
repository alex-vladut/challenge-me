import {
  AcceptChallenge,
  AcceptChallengeSuccess,
  CreateChallenge,
  CreateChallengeFail,
  CreateChallengeInit,
  CreateChallengeSuccess,
  FetchChallengeFail,
  FetchChallenges,
  FetchChallengesFail,
  FetchChallengesSuccess,
  FetchChallengeSuccess,
  RejectChallenge,
  RejectChallengeSuccess,
  SetChallengeWinner,
  SetChallengeWinnerSuccess,
} from '../actions/challenges.actions';
import * as actionTypes from '../actions/actionTypes';

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
    case FetchChallenges.type:
    case actionTypes.FETCH_USERS:
    case CreateChallenge.type:
    case SetChallengeWinner.type:
    case actionTypes.FETCH_PROFILE:
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        loading: true
      };
    case AcceptChallenge.type:
      return {
        ...state,
        accepting: true,
        loading: true
      };
    case RejectChallenge.type:
      return {
        ...state,
        rejecting: true,
        loading: true
      };
    case FetchChallengesSuccess.type:
      return {
        ...state,
        challenges: action.payload,
        loading: false,
        error: null
      };
    case FetchChallengeSuccess.type:
    case SetChallengeWinnerSuccess.type:
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
    case CreateChallengeSuccess.type:
      return {
        ...state,
        loading: false,
        error: null,
        challengeCreated: true
      };
    case AcceptChallengeSuccess.type:
      return {
        ...state,
        loading: false,
        accepting: false,
        error: null,
        challenge: action.payload,
      }
    case RejectChallengeSuccess.type:
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
    case FetchChallengesFail.type:
    case FetchChallengeFail.type:
    case actionTypes.FETCH_USERS_FAIL:
    case CreateChallengeFail.type:
    case actionTypes.FETCH_PROFILE_FAIL:
    case actionTypes.SIGN_OUT_FAIL:
      return {
        ...state,
        challenges: [],
        loading: false,
        error: action.error
      };
    case CreateChallengeInit.type:
      return {
        ...state,
        challengeCreated: false
      };
    default:
      return state;
  }
};

export default reducer;