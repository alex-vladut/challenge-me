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

const translateChallenge = challenge => ({
  id: challenge.id,
  challengeOwnerId: challenge.owner.id,
  title: challenge.title,
  deadline: challenge.deadline,
  challengeOpponentId: challenge.opponent.id,
  opponentStatus: challenge.opponentStatus,
  challengeRefereeId: challenge.referee.id,
  refereeStatus: challenge.refereeStatus,
  expectedVersion: challenge.version
})

export const acceptChallengeStart = () => ({
  type: actionTypes.ACCEPT_CHALLENGE_START,
});

export const acceptChallengeSuccess = challenge => ({
  type: actionTypes.ACCEPT_CHALLENGE_SUCCESS,
  challenge
});

export const acceptChallengeFail = () => ({
  type: actionTypes.ACCEPT_CHALLENGE_FAIL,
});

export const acceptChallenge = (challenge, profile) => (
  async dispatch => {
    dispatch(acceptChallengeStart());
    try {
      let challengeToSave = translateChallenge(challenge);
      if (challenge.opponent.id === profile.id) {
        challengeToSave = { ...challengeToSave, opponentStatus: 'ACCEPTED' };
      } else if (challenge.referee.id === profile.id) {
        challengeToSave = { ...challengeToSave, refereeStatus: 'ACCEPTED' };
      } else {
        throw new Error('You cannot accept or reject this challenge!');
      }
      const response = await API.graphql(graphqlOperation(mutations.updateChallenge, { input: challengeToSave }));
      dispatch(acceptChallengeSuccess(response.data.updateChallenge));
    } catch (error) {
      console.error(error);
      dispatch(acceptChallengeFail(error));
    }
  }
);

export const rejectChallengeStart = () => ({
  type: actionTypes.REJECT_CHALLENGE_START,
});

export const rejectChallengeSuccess = challenge => ({
  type: actionTypes.REJECT_CHALLENGE_SUCCESS,
  challenge
});

export const rejectChallengeFail = () => ({
  type: actionTypes.REJECT_CHALLENGE_FAIL,
});

export const rejectChallenge = (challenge, profile) => (
  async dispatch => {
    dispatch(rejectChallengeStart());
    try {
      let challengeToSave = translateChallenge(challenge);
      if (challenge.opponent.id === profile.id) {
        challengeToSave = { ...challengeToSave, refereeStatus: 'ACCEPTED' };
      } else if (challenge.referee.id === profile.id) {
        challengeToSave = { ...challengeToSave, refereeStatus: 'REJECTED' };
      } else {
        throw new Error('You cannot accept or reject this challenge!');
      }
      const response = await API.graphql(graphqlOperation(mutations.updateChallenge, { input: challengeToSave }));
      dispatch(rejectChallengeSuccess(response.data.updateChallenge));
    } catch (error) {
      console.error(error);
      dispatch(rejectChallengeFail(error));
    }
  }
);

export const setChallengeWinnerStart = () => ({
  type: actionTypes.SET_CHALLENGE_WINNER_START,
});

export const setChallengeWinnerSuccess = challenge => ({
  type: actionTypes.SET_CHALLENGE_WINNER_SUCCESS,
  challenge
});

export const setChallengeWinnerFail = () => ({
  type: actionTypes.SET_CHALLENGE_WINNER_FAIL,
});

export const setChallengeWinner = (challenge, winner) => (
  async dispatch => {
    dispatch(setChallengeWinnerStart());
    try {
      let challengeToSave = { ...translateChallenge(challenge), challengeWinnerId: winner.id };
      const response = await API.graphql(graphqlOperation(mutations.updateChallenge, { input: challengeToSave }));
      dispatch(setChallengeWinnerSuccess(response.data.updateChallenge));
    } catch (error) {
      dispatch(setChallengeWinnerFail(error));
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