import * as actionTypes from './actions/actionTypes';

const initialState = {
    challenges: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CHALLENGES_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_CHALLENGES_SUCCESS:
            return {
                ...state,
                challenges: action.challenges,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_CHALLENGES_FAIL:
            return {
                ...state,
                challenges: [],
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
};

export default reducer;