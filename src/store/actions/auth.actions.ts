import { action, actionWithoutPayload, payload } from "./actions";

export const FetchProfile = actionWithoutPayload("FETCH_PROFILE");
export const FetchProfileSuccess = action(
  "FETCH_PROFILE_SUCCESS",
  payload<any>()
);
export const FetchProfileFail = action("FETCH_PROFILE_FAIL", payload<any>());
export const FetchProfileNotFound = actionWithoutPayload(
  "FETCH_PROFILE_NOT_FOUND"
);

export const SignOut = actionWithoutPayload("SIGN_OUT");
export const SignOutSuccess = actionWithoutPayload("SIGN_OUT_SUCCESS");
export const SignOutFail = action("SIGN_OUT_FAIL", payload<any>());
