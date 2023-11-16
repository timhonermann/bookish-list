import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.state';

const featureSelector = createFeatureSelector<AuthState>(authFeatureKey);

export class AuthSelectors {
  static readonly userId = createSelector(
    featureSelector,
    (state) => state.userId
  );
}
