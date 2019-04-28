import * as actionTypes from './actionTypes';

export const fetchChallenges = () => ({
  type: actionTypes.FETCH_CHALLENGES
});

export const fetchChallengesSuccess = challenges => ({
  type: actionTypes.FETCH_CHALLENGES_SUCCESS,
  payload: challenges
});

export const fetchChallengesFail = error => ({
  type: actionTypes.FETCH_CHALLENGES_FAIL,
  error
});

export const fetchChallenge = challengeId => ({
  type: actionTypes.FETCH_CHALLENGE,
  payload: challengeId
});

export const fetchChallengeSuccess = challenge => ({
  type: actionTypes.FETCH_CHALLENGE_SUCCESS,
  payload: challenge
});

export const fetchChallengeFail = error => ({
  type: actionTypes.FETCH_CHALLENGE_FAIL,
  error
});

export const acceptChallenge = challenge => ({
  type: actionTypes.ACCEPT_CHALLENGE,
  payload: challenge,
});

export const acceptChallengeSuccess = challenge => ({
  type: actionTypes.ACCEPT_CHALLENGE_SUCCESS,
  payload: challenge
});

export const acceptChallengeFail = () => ({
  type: actionTypes.ACCEPT_CHALLENGE_FAIL,
});

export const rejectChallenge = (challenge) => ({
  type: actionTypes.REJECT_CHALLENGE,
  payload: challenge
});

export const rejectChallengeSuccess = challenge => ({
  type: actionTypes.REJECT_CHALLENGE_SUCCESS,
  payload: challenge
});

export const rejectChallengeFail = () => ({
  type: actionTypes.REJECT_CHALLENGE_FAIL,
});

export const setChallengeWinner = (challenge, winner) => ({
  type: actionTypes.SET_CHALLENGE_WINNER,
  payload: { challenge, winner }
});

export const setChallengeWinnerSuccess = challenge => ({
  type: actionTypes.SET_CHALLENGE_WINNER_SUCCESS,
  payload: challenge
});

export const setChallengeWinnerFail = () => ({
  type: actionTypes.SET_CHALLENGE_WINNER_FAIL,
});

export const createChallengeInit = () => ({
  type: actionTypes.CREATE_CHALLENGE_INIT
});

export const createChallenge = challenge => ({
  type: actionTypes.CREATE_CHALLENGE,
  payload: challenge,
});

export const createChallengeSuccess = challenge => ({
  type: actionTypes.CREATE_CHALLENGE_SUCCESS,
  payload: challenge,
});

export const createChallengeFail = error => ({
  type: actionTypes.CREATE_CHALLENGE_FAIL,
  error
});

export const fetchUsers = () => ({
  type: actionTypes.FETCH_USERS
});

export const fetchUsersSuccess = users => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFail = error => ({
  type: actionTypes.FETCH_USERS_FAIL,
  error
});

export const fetchProfile = () => ({
  type: actionTypes.FETCH_PROFILE,
});

export const fetchProfileFail = error => ({
  type: actionTypes.FETCH_PROFILE_FAIL,
  error
});

export const fetchProfileSuccess = profile => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileNotFound = () => ({
  type: actionTypes.FETCH_PROFILE_NOT_FOUND,
});

export const signOut = () => ({
  type: actionTypes.SIGN_OUT,
});

export const signOutFail = error => ({
  type: actionTypes.SIGN_OUT_FAIL,
  error
});

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS
});