import { action, actionWithoutPayload, payload } from './actions';

export const CreateActivity = action('CREATE_ACTIVITY', payload<any>());
export const CreateActivitySuccess = actionWithoutPayload('CREATE_ACTIVITY_SUCCESS');
export const CreateActivityFail = action('CREATE_ACTIVITY_FAIL', payload<any>());
