import { action, actionWithoutPayload, payload } from "./actions";

export const FeatureKey = "[ACTIVITIES]";
export const Create = action(`${FeatureKey} CREATE`, payload<any>());
export const CreateSuccess = actionWithoutPayload(`${FeatureKey} CREATE_SUCCESS`);
export const CreateFail = action(`${FeatureKey} CREATE_FAIL`, payload<string>());
export const Delete = action(`${FeatureKey} DELETE`, payload<any>());
export const DeleteSuccess = actionWithoutPayload(`${FeatureKey} DELETE_SUCCESS`);
export const DeleteFail = action(`${FeatureKey} DELETE_FAIL`, payload<any>());
export const Fetch = actionWithoutPayload(`${FeatureKey} FETCH`);
export const FetchSuccess = action(`${FeatureKey} FETCH_SUCCESS`, payload<any>());
export const FetchFail = action(`${FeatureKey} FETCH_FAIL`, payload<string>());
export const CleanMessages = actionWithoutPayload(`${FeatureKey} CLEAN_MESSAGES`);
