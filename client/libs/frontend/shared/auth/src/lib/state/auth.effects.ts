import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AuthActions } from './auth.actions';

export const login$ = createEffect(
  (
    actions$ = inject(Actions),
    authenticationService = inject(AuthenticationService),
  ) =>
    actions$.pipe(
      ofType(AuthActions.login),
      tap(() => authenticationService.login()),
    ),
  { dispatch: false, functional: true },
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    authenticationService = inject(AuthenticationService),
  ) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        authenticationService
          .logout()
          .pipe(map(() => AuthActions.logoutSuccess())),
      ),
    ),
  { functional: true },
);

export const checkAuth$ = createEffect(
  (
    actions$ = inject(Actions),
    authenticationService = inject(AuthenticationService),
  ) =>
    actions$.pipe(
      ofType(AuthActions.checkAuth),
      concatMap(() =>
        authenticationService
          .checkAuth()
          .pipe(map((userId) => AuthActions.checkAuthSuccess({ userId }))),
      ),
    ),
  { functional: true },
);
