import { AuthActions } from './auth.actions';
import { authReducer } from './auth.reducer';
import { AuthState, initialAuthState } from './auth.state';

describe('AuthReducer', () => {
  describe('checkAuthSuccess', () => {
    it('should set userId', () => {
      // arrange
      const userId = '998877';
      const action = AuthActions.checkAuthSuccess({ userId });

      // act
      const result = authReducer(initialAuthState, action);

      // assert
      expect(result.userId).toEqual(userId);
    });
  });

  describe('logoutSuccess', () => {
    it('should reset to initial state', () => {
      // arrange
      const state: AuthState = {
        userId: '123456789',
      };
      const action = AuthActions.logoutSuccess();

      // act
      const result = authReducer(state, action);

      // assert
      expect(result).toEqual(initialAuthState);
    });
  });
});
