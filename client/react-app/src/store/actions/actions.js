import { API, Auth, graphqlOperation } from 'aws-amplify';

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as actionTypes from './actionTypes';

export const fetchChallengesStart = () => ({
  type: actionTypes.FETCH_CHALLENGES_START
});

export const fetchChallengesSuccess = challenges => ({
  type: actionTypes.FETCH_CHALLENGES_SUCCESS,
  challenges
});

export const fetchChallengesFail = error => ({
  type: actionTypes.FETCH_CHALLENGES_FAIL,
  error
});

export const fetchChallenges = () => (
  async dispatch => {
    dispatch(fetchChallengesStart());
    try {
      const response = await API.graphql(graphqlOperation(queries.listChallenges, { limit: 10 }));
      dispatch(fetchChallengesSuccess(response.data.listChallenges.items));
    } catch (error) {
      //TODO Have proper error handling
      dispatch(fetchChallengesFail('Sorry, something went wrong while loading your challenges.'));
    }
  }
);

export const fetchChallengeStart = () => ({
  type: actionTypes.FETCH_CHALLENGE_START
});

export const fetchChallengeSuccess = challenge => ({
  type: actionTypes.FETCH_CHALLENGE_SUCCESS,
  challenge
});

export const fetchChallengeFail = error => ({
  type: actionTypes.FETCH_CHALLENGE_FAIL,
  error
});

export const fetchChallenge = challengeId => (
  async dispatch => {
    dispatch(fetchChallengeStart());
    try {
      const response = await API.graphql(graphqlOperation(queries.getChallenge, { id: challengeId }));
      dispatch(fetchChallengeSuccess(response.data.getChallenge));
    } catch (error) {
      //TODO Have proper error handling
      dispatch(fetchChallengeFail('Sorry, something went wrong while loading your challenges.'));
    }
  }
);

export const createChallengeInit = () => ({
  type: actionTypes.CREATE_CHALLENGE_INIT
})

export const createChallengeStart = () => ({
  type: actionTypes.CREATE_CHALLENGE_START
});

export const createChallengeSuccess = challenge => ({
  type: actionTypes.CREATE_CHALLENGE_SUCCESS,
  challenge
});

export const createChallengeFail = error => ({
  type: actionTypes.CREATE_CHALLENGE_FAIL,
  error
});

export const createChallenge = challenge => (
  async dispatch => {
    dispatch(createChallengeStart());
    try {
      const challengeToSave = {
        title: challenge.title,
        deadline: challenge.deadline,
        challengeOpponentId: challenge.opponent,
        challengeRefereeId: challenge.referee,
      }
      const savedChallenge = await API.graphql(graphqlOperation(mutations.createChallenge, { input: challengeToSave }));
      dispatch(createChallengeSuccess({ challenge: savedChallenge.data.createChallenge }));
    } catch (error) {
      console.error(error);
      //TODO Have proper error handling
      dispatch(createChallengeFail('Sorry, something went wrong while loading your challenges.'));
    }
  }
);

export const fetchUsersStart = () => ({
  type: actionTypes.FETCH_USERS_START
});

export const fetchUsersSuccess = users => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  users
});

export const fetchUsersFail = error => ({
  type: actionTypes.FETCH_USERS_FAIL,
  error
});

export const fetchUsers = () => (
  async dispatch => {
    dispatch(fetchUsersStart());
    try {
      // const users = await API.get('ChallengeMeAPI', '/users');
      const response = await API.graphql(graphqlOperation(queries.listUsers, {}));
      dispatch(fetchUsersSuccess(response.data.listUsers.items));
    } catch (error) {
      console.log(error);
      //TODO Have proper error handling
      return dispatch(fetchUsersFail('Sorry, something went wrong while loading your the users.'));
    }
  }
);

export const fetchProfileStart = () => ({
  type: actionTypes.FETCH_PROFILE_START
});

export const fetchProfileFail = error => ({
  type: actionTypes.FETCH_PROFILE_FAIL,
  error
});

export const fetchProfileSuccess = profile => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  profile
});

export const fetchProfile = () => (
  async dispatch => {
    dispatch(fetchProfileStart());
    const authenticatedUser = await Auth.currentAuthenticatedUser();
    try {
      const response = await API.graphql(graphqlOperation(queries.getUser, { id: authenticatedUser.id }));
      if (!response.data.getUser) {
        const profile = await API.graphql(graphqlOperation(mutations.createUser, { input: { name: authenticatedUser.name } }));
        dispatch(fetchProfileSuccess(profile.data.createUser));
      } else {
        dispatch(fetchProfileSuccess(response.data.getUser));
      }

      // find a better way to implement it (ideally should be a side effect of ProfileSuccess)
      // API.graphql(graphqlOperation(subscriptions.onCreateChallenge)).subscribe({
      //   next: challenge => console.log(`Nice, a new challenge was received: ${JSON.stringify(challenge)}`)
      // });
    } catch (error) {
      console.log(error);
      dispatch(fetchProfileFail('Sorry, something went wrong while loading your challenges.'));
    }
  }
)

export const signOutStart = () => ({
  type: actionTypes.SIGN_OUT_START,
});

export const signOutFail = error => ({
  type: actionTypes.SIGN_OUT_FAIL,
  error
});

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS
});

export const signOut = () => (
  async dispatch => {
    dispatch(signOutStart());
    try {
      await Auth.signOut();
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error.response);
      dispatch(signOutFail());
    }
  }
)