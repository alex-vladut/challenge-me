import { action, actionWithoutPayload, payload } from "./actions";

export const FeatureKey = "[AUTH]";

export const Fetch = actionWithoutPayload(`${FeatureKey} FETCH_PROFILE`);
export const FetchSuccess = action(`${FeatureKey} FETCH_PROFILE_SUCCESS`, payload<any>());
export const FetchFail = action(`${FeatureKey} FETCH_PROFILE_FAIL`, payload<any>());

export const FetchLocationSuccess = action(`${FeatureKey} FETCH_LOCATION_SUCCESS`, payload<any>());
export const FetchLocationFail = action(`${FeatureKey} FETCH_LOCATION_FAIL`, payload<any>());

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

export const NotificationCreated = action(`${FeatureKey} NOTIFICATION_CREATED`, payload<any>());
export const NotificationUpdated = action(`${FeatureKey} NOTIFICATION_UPDATED`, payload<any>());
export const NotificationDeleted = action(`${FeatureKey} NOTIFICATION_DELETED`, payload<any>());

export const MarkNotificationAsRead = action(`${FeatureKey} MARK_NOTIFICATION_AS_READ`, payload<any>());
export const MarkNotificationAsReadSuccess = action(`${FeatureKey} MARK_NOTIFICATION_AS_READ_SUCCESS`, payload<any>());
export const MarkNotificationAsReadFail = action(`${FeatureKey} MARK_NOTIFICATION_AS_READ_FAIL`, payload<any>());

export const MarkNotificationAsUnread = action(`${FeatureKey} MARK_NOTIFICATION_AS_UNREAD`, payload<any>());
export const MarkNotificationAsUnreadSuccess = action(
  `${FeatureKey} MARK_NOTIFICATION_AS_UNREAD_SUCCESS`,
  payload<any>()
);
export const MarkNotificationAsUnreadFail = action(`${FeatureKey} MARK_NOTIFICATION_AS_UNREAD_FAIL`, payload<any>());

export const DeleteNotification = action(`${FeatureKey} DELETE_NOTIFICATION`, payload<any>());
export const DeleteNotificationSuccess = action(`${FeatureKey} DELETE_NOTIFICATION_SUCCESS`, payload<any>());
export const DeleteNotificationFail = action(`${FeatureKey} DELETE_NOTIFICATION_FAIL`, payload<any>());
