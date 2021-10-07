import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';

@Injectable()
export class UsersFacade {

  constructor(private readonly store: Store) {}

  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
