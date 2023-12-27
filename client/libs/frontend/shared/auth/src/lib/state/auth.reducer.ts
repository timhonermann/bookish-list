import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer<AuthState>(
  initialAuthState,

  on(AuthActions.checkAuthSuccess, (state, { userId }) => ({
    ...state,
    userId,
  })),

  on(AuthActions.logoutSuccess, () => ({
    ...initialAuthState,
  })),
);
