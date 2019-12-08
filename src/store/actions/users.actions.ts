import { action, payload } from "./actions";

export const FeatureKey = "[USERS]";

export const FetchUser = action(`${FeatureKey} FETCH_USER`, payload<string>());
export const FetchUserSuccess = action(`${FeatureKey} FETCH_USER_SUCCESS`, payload<any[]>());
export const FetchUserFail = action(`${FeatureKey} FETCH_USER_FAIL`, payload<any>());
