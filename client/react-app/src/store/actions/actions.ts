import * as actionTypes from './actionTypes';

export interface Action<T> {
  type: string;
  payload?: T
}

export const action = (type: string) => ({
  type,
  create: (payload?: any): Action<any> => ({ type, payload }),
});

export const FetchChallenges = action('FETCH_CHALLENGES');

export const fetchChallengesSuccess = (challenges: any[]) => ({
  type: actionTypes.FETCH_CHALLENGES_SUCCESS,
  payload: challenges
});

export const fetchChallengesFail = (error: any) => ({
  type: actionTypes.FETCH_CHALLENGES_FAIL,
  payload: error,
});

export const fetchChallenge = (challengeId: string) => ({
  type: actionTypes.FETCH_CHALLENGE,
  payload: challengeId,
});

export const fetchChallengeSuccess = (challenge: any) => ({
  type: actionTypes.FETCH_CHALLENGE_SUCCESS,
  payload: challenge,
});

export const fetchChallengeFail = (error: any) => ({
  type: actionTypes.FETCH_CHALLENGE_FAIL,
  payload: error,
});

export const acceptChallenge = (challenge: any) => ({
  type: actionTypes.ACCEPT_CHALLENGE,
  payload: challenge,
});

export const acceptChallengeSuccess = (challenge: any) => ({
  type: actionTypes.ACCEPT_CHALLENGE_SUCCESS,
  payload: challenge
});

export const acceptChallengeFail = () => ({
  type: actionTypes.ACCEPT_CHALLENGE_FAIL,
});

export const rejectChallenge = (challenge: any) => ({
  type: actionTypes.REJECT_CHALLENGE,
  payload: challenge
});

export const rejectChallengeSuccess = (challenge: any) => ({
  type: actionTypes.REJECT_CHALLENGE_SUCCESS,
  payload: challenge
});

export const rejectChallengeFail = () => ({
  type: actionTypes.REJECT_CHALLENGE_FAIL,
});

export const setChallengeWinner = (challenge: any, winner: any) => ({
  type: actionTypes.SET_CHALLENGE_WINNER,
  payload: { challenge, winner }
});

export const setChallengeWinnerSuccess = (challenge: any) => ({
  type: actionTypes.SET_CHALLENGE_WINNER_SUCCESS,
  payload: challenge
});

export const setChallengeWinnerFail = () => ({
  type: actionTypes.SET_CHALLENGE_WINNER_FAIL,
});

export const createChallengeInit = () => ({
  type: actionTypes.CREATE_CHALLENGE_INIT
});

export const createChallenge = (challenge: any) => ({
  type: actionTypes.CREATE_CHALLENGE,
  payload: challenge,
});

export const createChallengeSuccess = (challenge: any) => ({
  type: actionTypes.CREATE_CHALLENGE_SUCCESS,
  payload: challenge,
});

export const createChallengeFail = (error: any) => ({
  type: actionTypes.CREATE_CHALLENGE_FAIL,
  error
});

export const fetchUsers = () => ({
  type: actionTypes.FETCH_USERS
});

export const fetchUsersSuccess = (users: any[]) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFail = (error: any) => ({
  type: actionTypes.FETCH_USERS_FAIL,
  payload: error
});

export const fetchProfile = () => ({
  type: actionTypes.FETCH_PROFILE,
});

export const fetchProfileFail = (error: any) => ({
  type: actionTypes.FETCH_PROFILE_FAIL,
  error
});

export const fetchProfileSuccess = (profile: any) => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileNotFound = () => ({
  type: actionTypes.FETCH_PROFILE_NOT_FOUND,
});

export const signOut = () => ({
  type: actionTypes.SIGN_OUT,
});

export const signOutFail = (error: any) => ({
  type: actionTypes.SIGN_OUT_FAIL,
  payload: error
});

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS
});