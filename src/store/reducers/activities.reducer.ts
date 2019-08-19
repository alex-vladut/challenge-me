import { Create, CreateFail, CreateSuccess, Fetch, FetchFail, FetchSuccess } from "../actions/activities.actions";

export interface State {
  activities: any[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  loading: false,
  activities: [],
  error: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Create.type:
      return { ...state, error: null, loading: true };
    case CreateSuccess.type:
      return { ...state, loading: false };
    case CreateFail.type:
      return { ...state, error: action.payload, loading: false };
    case Fetch.type:
      return { ...state, error: null, loading: true };
    case FetchSuccess.type:
      return { ...state, activities: action.payload, loading: false };
    case FetchFail.type:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default reducer;
