import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchChallengesStart = () => ({
    type: actionTypes.FETCH_CHALLENGES_START
})

export const fetchChallengesSuccess = challenges => ({
    type: actionTypes.FETCH_CHALLENGES_SUCCESS,
    challenges
});

export const fetchChallengesFail = error => ({
    type: actionTypes.FETCH_CHALLENGES_FAIL,
    error
})

export const fetchChallenges = () => (
    async dispatch => {
        dispatch(fetchChallengesStart());
        try {
            const response = await axios.get('/challenges');
            const challenges = response.data.challenges;
            return dispatch(fetchChallengesSuccess(challenges));
        } catch (error) {
            //TODO Have proper error handling
            return dispatch(fetchChallengesFail('Sorry, something went wrong while loading your challenges.'))
        }

    }
)