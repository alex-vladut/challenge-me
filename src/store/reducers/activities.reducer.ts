import { Create, CreateFail, CreateSuccess, Fetch, FetchFail, FetchSuccess } from '../actions/activities.actions';

export interface State {
  loading: boolean
  activities: any[]
}

const initialState: State = {
  loading: false,
  activities: []
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Create.type:
      return { ...state, loading: true }
    case CreateSuccess.type:
      return { ...state, loading: false }
    case CreateFail.type:
      return { ...state, loading: false }
    case Fetch.type:
      return { ...state, loading: true }
    case FetchSuccess.type:
      return { ...state, activities: action.payload, loading: false }
    case FetchFail.type:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default reducer