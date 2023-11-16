import { createAction, props } from '@ngrx/store';

const actionPrefix = '[Auth]';

export class AuthActions {
  static readonly login = createAction(`${actionPrefix} Login`);

  static readonly checkAuthSuccess = createAction(
    `${actionPrefix} Check Auth Success`,
    props<{ userId: string | null }>()
  );

  static readonly logout = createAction(`${actionPrefix} Logout`);

  static readonly logoutSuccess = createAction(
    `${actionPrefix} Logout Success`
  );

  static readonly checkAuth = createAction(`${actionPrefix} Check Auth`);
}
