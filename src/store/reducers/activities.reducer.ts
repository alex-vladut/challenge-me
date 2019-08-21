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
  FetchParticipationsSuccess,
  FetchParticipationsFail
} from "../actions/activities.actions";

export interface State {
  activities: any[];
  activity: any;
  created: boolean;
  loading: boolean;
}

const initialState: State = {
  activities: [],
  activity: null,
  created: false,
  loading: false
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
    case FetchAll.type:
      return { ...state, created: false, loading: true };
    case FetchAllSuccess.type:
      return { ...state, activities: payload, loading: false };
    case FetchAllFail.type:
      return { ...state, loading: false };
    case FetchActivity.type:
      return { ...state, loading: true };
    case FetchActivitySuccess.type:
      return { ...state, activity: payload, loading: true };
    case FetchActivityFail.type:
      return { ...state, loading: false };
    case FetchParticipationsSuccess.type:
      return { ...state, activity: { ...state.activity, participations: payload }, loading: false };
    case FetchParticipationsFail.type:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
