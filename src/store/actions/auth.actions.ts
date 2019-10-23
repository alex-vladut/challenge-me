import { action, actionWithoutPayload, payload } from "./actions";

export const Fetch = actionWithoutPayload("FETCH_PROFILE");
export const FetchSuccess = action("FETCH_PROFILE_SUCCESS", payload<any>());
export const FetchFail = action("FETCH_PROFILE_FAIL", payload<any>());

export const FetchLocationSuccess = action("FETCH_LOCATION_SUCCESS", payload<any>());

export const Save = action("SAVE", payload<any>());
export const SaveSuccess = action("SAVE_SUCCESS", payload<any>());
export const SaveFail = action("SAVE_FAIL", payload<any>());

export const SignOut = actionWithoutPayload("SIGN_OUT");
export const SignOutSuccess = actionWithoutPayload("SIGN_OUT_SUCCESS");
export const SignOutFail = action("SIGN_OUT_FAIL", payload<any>());
