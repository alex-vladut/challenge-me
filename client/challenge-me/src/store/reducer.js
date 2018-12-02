import * as actionTypes from './actions/actionTypes';

const initialState = {
    challenges: [],
    users: [],
    loading: false,
    error: null,
    challengeCreated: false,
    profile: null,
    authenticated: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CHALLENGES_START:
        case actionTypes.FETCH_USERS_START:
        case actionTypes.CREATE_CHALLENGE_START:
        case actionTypes.FETCH_PROFILE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_CHALLENGES_SUCCESS:
            return {
                ...state,
                challenges: action.challenges,
                loading: false,
                error: null
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                loading: false,
                error: null
            };
        case actionTypes.CREATE_CHALLENGE_SUCCESS:
            return {
                ...state,
                challenges: state.challenges.concat(action.challenge),
                loading: false,
                error: null,
                challengeCreated: true
            };
        case actionTypes.FETCH_CHALLENGES_FAIL:
        case actionTypes.FETCH_USERS_FAIL:
        case actionTypes.CREATE_CHALLENGE_FAIL:
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