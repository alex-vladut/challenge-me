import sports from "../../shared/sports";
import { ActionWithPayload } from "../actions/actions";
import {
  Create,
  CreateFail,
  CreateSuccess,
  FetchAll,
  FetchAllFail,
  FetchAllSuccess,
  Delete,
  DeleteSuccess,
  DeleteFail,
  Accept,
  AcceptSuccess,
  AcceptFail,
  Reject,
  RejectSuccess,
  RejectFail,
  FetchActivity,
  FetchActivitySuccess,
  FetchActivityFail,
  SetFilters
} from "../actions/activities.actions";

export interface FiltersState {
  location: any;
}

export interface State {
  activities: any[];
  activity: any;
  sports: any[];
  created: string | null;
  filters: FiltersState;
  deleted: boolean;
  loading: boolean;
}

const initialState: State = {
  activities: [],
  activity: null,
  sports,
  created: null,
  filters: {
    location: {}
  },
  deleted: false,
  loading: false
};

const reducer = (state = initialState, { type, payload }: ActionWithPayload<any>): State => {
  switch (type) {
    case SetFilters.type:
      return { ...state, filters: payload };
    case Create.type:
      return { ...state, loading: true };
    case CreateSuccess.type:
      return { ...state, created: payload.id, loading: false };
    case CreateFail.type:
      return { ...state, loading: false };
    case Delete.type:
      return { ...state, loading: true };
    case DeleteSuccess.type:
      return { ...state, deleted: true, activity: null, loading: false };
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
    case FetchAll.type:
      return { ...state, created: null, deleted: false, loading: true };
    case FetchAllSuccess.type:
      return { ...state, activities: payload, loading: false };
    case FetchAllFail.type:
      return { ...state, loading: false };
    case FetchActivity.type:
      return { ...state, loading: true };
    case FetchActivitySuccess.type:
      return {
        ...state,
        activity: { ...payload, participations: payload.participations.items },
        loading: false
      };
    case FetchActivityFail.type:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
