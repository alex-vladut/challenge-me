import { action, actionWithoutPayload, payload } from "./actions";

export const FeatureKey = "[AUTH]";

export const Fetch = actionWithoutPayload(`${FeatureKey} FETCH_PROFILE`);
export const FetchSuccess = action(`${FeatureKey} FETCH_PROFILE_SUCCESS`, payload<any>());
export const FetchFail = action(`${FeatureKey} FETCH_PROFILE_FAIL`, payload<any>());

export const FetchLocationSuccess = action(`${FeatureKey} FETCH_LOCATION_SUCCESS`, payload<any>());

export const Save = action(`${FeatureKey} SAVE`, payload<any>());
export const SaveSuccess = action(`${FeatureKey} SAVE_SUCCESS`, payload<any>());
export const SaveFail = action(`${FeatureKey} SAVE_FAIL`, payload<any>());

export const SignOut = actionWithoutPayload(`${FeatureKey} SIGN_OUT`);
export const SignOutSuccess = actionWithoutPayload(`${FeatureKey} SIGN_OUT_SUCCESS`);
export const SignOutFail = action(`${FeatureKey} SIGN_OUT_FAIL`, payload<any>());

export const SendMessage = action(`${FeatureKey} SEND_MESSAGE`, payload<any>());
export const SendMessageSuccess = action(`${FeatureKey} SEND_MESSAGE_SUCCESS`, payload<any>());
export const SendMessageFail = action(`${FeatureKey} SEND_MESSAGE_FAIL`, payload<any>());

export const ParticipationCreatedOrUpdated = action(`${FeatureKey} PARTICIPATION_CREATED_OR_UPDATED`, payload<any>());
