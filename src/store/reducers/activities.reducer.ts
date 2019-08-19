import { ActionWithPayload } from "../actions/actions";
import { Create, CreateFail, CreateSuccess, Fetch, FetchFail, FetchSuccess, Delete, CleanMessages, DeleteSuccess, DeleteFail } from "../actions/activities.actions";

export interface State {
  activities: any[];
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: State = {
  loading: false,
  activities: [],
  errorMessage: null,
  successMessage: null
};

const reducer = (state = initialState, { type, payload }: ActionWithPayload<any>) => {
  switch (type) {
    case Create.type:
      return { ...state, errorMessage: null, successMessage: null, loading: true };
    case CreateSuccess.type:
      return { ...state, loading: false, successMessage: "Your activity was created successfully!" };
    case CreateFail.type:
      return { ...state, errorMessage: payload, loading: false };
    case Delete.type:
      return { ...state, errorMessage: null, successMessage: null, loading: true };
    case DeleteSuccess.type:
      return { ...state, loading: false, successMessage: "Your activity was removed successfully!" };
    case DeleteFail.type:
      return { ...state, loading: false, errorMessage: payload };
    case Fetch.type:
      return { ...state, errorMessage: null, successMessage: null, loading: true };
    case FetchSuccess.type:
      return { ...state, activities: payload, loading: false };
    case FetchFail.type:
      return { ...state, errorMessage: payload, loading: false };
    case CleanMessages.type:
      return { ...state, errorMessage: null, successMessage: null };
    default:
      return state;
  }
};

export default reducer;
