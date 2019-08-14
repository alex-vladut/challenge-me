import { CreateActivity, CreateActivityFail, CreateActivitySuccess } from '../actions/activities.actions';

export interface State {
  loading: boolean
}

const initialState: State = {
  loading: false,
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CreateActivity.type:
      return { ...state, loading: true }
    case CreateActivitySuccess.type:
      return { ...state, loading: false }
    case CreateActivityFail.type:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default reducer