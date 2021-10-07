import { User } from '@front-end/users';
import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';

export const buildUserSession = createAction('[Users] Build User Session');

export const buildUsersSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user: User }>()
);

export const buildUsersFailure = createAction(
  '[Users] Build User Session Failure'
);
