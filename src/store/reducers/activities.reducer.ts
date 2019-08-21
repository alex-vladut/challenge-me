import { ActionWithPayload } from "../actions/actions";
import {
  Create,
  CreateFail,
  CreateSuccess,
  Fetch,
  FetchFail,
  FetchSuccess,
  Delete,
  DeleteSuccess,
  DeleteFail,
  Accept,
  AcceptSuccess,
  AcceptFail,
  Reject,
  RejectSuccess,
  RejectFail
} from "../actions/activities.actions";

export interface State {
  activities: any[];
  loading: boolean;
  created: boolean;
}

const initialState: State = {
  loading: false,
  activities: [],
  created: false
};

const reducer = (state = initialState, { type, payload }: ActionWithPayload<any>): State => {
  switch (type) {
    case Create.type:
      return { ...state, loading: true };
    case CreateSuccess.type:
      return { ...state, created: true, loading: false };
    case CreateFail.type:
      return { ...state, loading: false };
    case Delete.type:
      return { ...state, loading: true };
    case DeleteSuccess.type:
      return { ...state, loading: false };
    case DeleteFail.type:
      return { ...state, loading: false };
    case Accept.type:
      return { ...state, loading: true };
    case AcceptSuccess.type:
      return { ...state, loading: false };
    case AcceptFail.type:
      return { ...state, loading: false };
    case Reject.type:
      return { ...state, loading: true };
    case RejectSuccess.type:
      return { ...state, loading: false };
    case RejectFail.type:
      return { ...state, loading: false };
    case Fetch.type:
      return { ...state, created: false, loading: true };
    case FetchSuccess.type:
      return { ...state, activities: payload, loading: false };
    case FetchFail.type:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
