import { Injectable } from '@angular/core';
import { UsersService } from '@front-end/users';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorage.isValidToken()) {
          const userId = this.localStorage.getUserIdFromToken();
          if (userId) {
            return this.userService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUsersSuccess({user: user});
              }),
              catchError(() => of(UsersActions.buildUsersFailure()))
            );
          }
        } else {
          return of(UsersActions.buildUsersFailure());
        }
      })
    )
  );

  constructor(private readonly actions$: Actions, private localStorage: LocalstorageService, private userService: UsersService) {}
}
