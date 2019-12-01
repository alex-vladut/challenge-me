import sports from "../../shared/sports";
import { ActionWithPayload } from "../actions/actions";
import {
  Create,
  CreateFail,
  CreateSuccess,
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
  SetFilters,
  SetActivityId,
  CreateComment,
  CreateCommentSuccess,
  CreateCommentFail,
  FetchMoreComments,
  FetchMoreCommentsSuccess,
  FetchMoreCommentsFail
} from "../actions/activities.actions";

export interface FiltersState {
  location: any;
}

export interface State {
  activities: any[];
  activity: any;
  activityId: string | null;
  sports: any[];
  created: string | null;
  filters: FiltersState;
  deleted: boolean;
  loading: boolean;
  commentsNextToken: string | null;
}

const initialState: State = {
  activities: [],
  activity: null,
  activityId: null,
  sports,
  created: null,
  filters: {
    location: null
  },
  deleted: false,
  loading: false,
  commentsNextToken: null
};

const reducer = (state = initialState, { type, payload }: ActionWithPayload<any>): State => {
  switch (type) {
    case SetFilters.type:
      return { ...state, filters: payload, loading: true };
    case SetActivityId.type:
      return { ...state, activityId: payload };
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
    case FetchAllSuccess.type:
      return {
        ...state,
        activities: payload.items,
        loading: false
      };
    case FetchAllFail.type:
      return { ...state, loading: false };
    case FetchActivity.type:
      return { ...state, loading: true };
    case CreateComment.type:
      return { ...state, loading: true };
    case CreateCommentSuccess.type:
    case CreateCommentFail.type:
      return { ...state, loading: false };
    case FetchActivitySuccess.type:
      return {
        ...state,
        activity: {
          ...payload,
          participations: payload.participations.items,
          comments: payload.comments.items
        },
        commentsNextToken: payload.comments.nextToken,
        loading: false
      };
    case FetchMoreComments.type:
      return { ...state, loading: true };
    case FetchMoreCommentsSuccess.type:
      return {
        ...state,
        activity: {
          ...state.activity,
          comments: [...state.activity.comments, ...payload.comments.items]
        },
        commentsNextToken: payload.comments.nextToken,
        loading: false
      };
    case FetchActivityFail.type:
    case FetchMoreCommentsFail.type:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
