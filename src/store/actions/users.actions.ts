import { action, payload } from './actions';

export const FetchUsers = action('FETCH_USERS', payload<string>());
export const FetchUsersSuccess = action('FETCH_USERS_SUCCESS', payload<any[]>());
export const FetchUsersFail = action('FETCH_USERS_FAIL', payload<any>());
