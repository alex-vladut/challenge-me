import * as actionTypes from './actionTypes';
import axios from '../../axios';

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
            const response = await axios.get('/challenges');
            const challenges = response.data.challenges;
            dispatch(fetchChallengesSuccess(challenges));
        } catch (error) {
            //TODO Have proper error handling
            dispatch(fetchChallengesFail('Sorry, something went wrong while loading your challenges.'));
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
            const response = await axios.post('/challenges', challenge);
            const challengeId = response.data.id;
            dispatch(createChallengeSuccess({
                ...challenge,
                id: challengeId
            }));
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
            const response = await axios.get('/users');
            const users = response.data.users;
            dispatch(fetchUsersSuccess(users));
        } catch (error) {
            //TODO Have proper error handling
            return dispatch(fetchUsersFail('Sorry, something went wrong while loading your challenges.'));
        }
    }
);