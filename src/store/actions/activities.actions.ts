import { action, payload, actionWithoutPayload } from "./actions";

export const FeatureKey = "[ACTIVITIES]";

export const SetFilters = action(`${FeatureKey} SET_FILTERS`, payload<any>());

export const Create = action(`${FeatureKey} CREATE`, payload<any>());
export const CreateSuccess = action(`${FeatureKey} CREATE_SUCCESS`, payload<string>());
export const CreateFail = action(`${FeatureKey} CREATE_FAIL`, payload<string>());

export const Delete = action(`${FeatureKey} DELETE`, payload<any>());
export const DeleteSuccess = action(`${FeatureKey} DELETE_SUCCESS`, payload<string>());
export const DeleteFail = action(`${FeatureKey} DELETE_FAIL`, payload<any>());

export const FetchAllSuccess = action(`${FeatureKey} FETCH_ALL_SUCCESS`, payload<any>());
export const FetchAllFail = action(`${FeatureKey} FETCH_ALL_FAIL`, payload<string>());

export const SetActivityId = action(`${FeatureKey} SET_ACTIVITY_ID`, payload<string>());

export const FetchActivity = action(`${FeatureKey} FETCH_ACTIVITY`, payload<any>());
export const FetchActivitySuccess = action(`${FeatureKey} FETCH_ACTIVITY_SUCCESS`, payload<any>());
export const FetchActivityFail = action(`${FeatureKey} FETCH_ACTIVITY_FAIL`, payload<any>());

export const Accept = action(`${FeatureKey} ACCEPT`, payload<any>());
export const AcceptSuccess = action(`${FeatureKey} ACCEPT_SUCCESS`, payload<string>());
export const AcceptFail = action(`${FeatureKey} ACCEPT_FAIL`, payload<any>());

export const Reject = action(`${FeatureKey} REJECT`, payload<any>());
export const RejectSuccess = action(`${FeatureKey} REJECT_SUCCESS`, payload<string>());
export const RejectFail = action(`${FeatureKey} REJECT_FAIL`, payload<any>());

export const CreateComment = action(`${FeatureKey} CREATE_COMMENT`, payload<any>());
export const CreateCommentSuccess = action(`${FeatureKey} CREATE_COMMENT_SUCCESS`, payload<any>());
export const CreateCommentFail = action(`${FeatureKey} CREATE_COMMENT_FAIL`, payload<any>());

export const FetchMoreComments = actionWithoutPayload(`${FeatureKey} FETCH_MORE_COMMENTS`);
export const FetchMoreCommentsSuccess = action(`${FeatureKey} FETCH_MORE_COMMENTS_SUCCESS`, payload<any>());
export const FetchMoreCommentsFail = action(`${FeatureKey} FETCH_MORE_COMMENTS_FAIL`, payload<any>());
