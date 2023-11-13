import { createAction } from '@ngrx/store';

const actionPrefix = '[Auth]';

export class AuthActions {
  static readonly login = createAction(`${actionPrefix} Login`);

  static readonly logout = createAction(`${actionPrefix} Logout`);
}
