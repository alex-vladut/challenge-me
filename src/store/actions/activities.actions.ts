import { action, actionWithoutPayload, payload } from "./actions";

export const FeatureKey = "[ACTIVITIES]";
export const Create = action(`${FeatureKey} CREATE`, payload<any>());
export const CreateSuccess = action(`${FeatureKey} CREATE_SUCCESS`, payload<string>());
export const CreateFail = action(`${FeatureKey} CREATE_FAIL`, payload<string>());
export const Delete = action(`${FeatureKey} DELETE`, payload<any>());
export const DeleteSuccess = action(`${FeatureKey} DELETE_SUCCESS`, payload<string>());
export const DeleteFail = action(`${FeatureKey} DELETE_FAIL`, payload<any>());
export const Fetch = actionWithoutPayload(`${FeatureKey} FETCH`);
export const FetchSuccess = action(`${FeatureKey} FETCH_SUCCESS`, payload<any>());
export const FetchFail = action(`${FeatureKey} FETCH_FAIL`, payload<string>());
export const Accept = action(`${FeatureKey} ACCEPT`, payload<any>());
export const AcceptSuccess = actionWithoutPayload(`${FeatureKey} ACCEPT_SUCCESS`);
export const AcceptFail = action(`${FeatureKey} ACCEPT_FAIL`, payload<any>());
export const Reject = action(`${FeatureKey} REJECT`, payload<any>());
export const RejectSuccess = actionWithoutPayload(`${FeatureKey} REJECT_SUCCESS`);
export const RejectFail = action(`${FeatureKey} REJECT_FAIL`, payload<any>());
