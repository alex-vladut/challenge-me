import { action, payload, actionWithoutPayload } from "./actions";

export const FeatureKey = "[NOTIFICATIONS]";
export const Create = action(`${FeatureKey} Create`, payload<any>());
export const Clear = actionWithoutPayload(`${FeatureKey} Clear`);
