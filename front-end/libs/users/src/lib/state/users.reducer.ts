import { User } from '@front-end/users';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false,
};

const usersReducer = createReducer(
  initialUserState,
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.buildUsersSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true,
  })),
  on(UsersActions.buildUsersFailure, (state, action) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return usersReducer(state, action);
}
