import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AuthActions } from './auth.actions';

export const login$ = createEffect(
  (
    actions$ = inject(Actions),
    authenticationService = inject(AuthenticationService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => authenticationService.login())
    ),
  { dispatch: false, functional: true }
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    authenticationService = inject(AuthenticationService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => authenticationService.logout())
    ),
  { dispatch: false, functional: true }
);
