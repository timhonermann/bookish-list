import { AuthSelectors } from './auth.selectors';
import { authFeatureKey, AuthState } from './auth.state';

describe('AuthSelectors', () => {
  describe('userId', () => {
    it('should return userId', () => {
      // arrange
      const userId = 'myUserId123';
      const state = {
        [authFeatureKey]: {
          userId,
        } as AuthState,
      };

      // act
      const result = AuthSelectors.userId(state);

      // assert
      expect(result).toEqual(userId);
    });
  });
});
