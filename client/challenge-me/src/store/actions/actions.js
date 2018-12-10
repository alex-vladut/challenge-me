import * as actionTypes from './actionTypes';
import { Auth, API } from 'aws-amplify';

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
            const challenges = await API.get('ChallengeMeAPI', '/challenges');
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
            const savedChallenge = await API.post('ChallengeMeAPI', '/challenges', {
                body: challenge
            });
            dispatch(createChallengeSuccess({
                challenge: savedChallenge
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
            const users = await API.get('ChallengeMeAPI', '/users');
            dispatch(fetchUsersSuccess(users));
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
        try {
            const profile = await API.get('ChallengeMeAPI', '/profile');
            dispatch(fetchProfileSuccess(profile));
        } catch (error) {
            if (error.response.status === 404) {
                const authenticatedUser = await Auth.currentAuthenticatedUser();
                const profile = await API.post('ChallengeMeAPI', '/profile', {
                    body: {
                        name: authenticatedUser.name
                    }
                });
                dispatch(fetchProfileSuccess(profile));
            } else {
                console.log(error.response);
                dispatch(fetchProfileFail('Sorry, something went wrong while loading your challenges.'));
            }
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