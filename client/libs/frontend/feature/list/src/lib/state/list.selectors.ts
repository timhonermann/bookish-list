import { createFeatureSelector, createSelector } from '@ngrx/store';
import { listFeatureKey, ListState } from './list.state';

const featureSelector = createFeatureSelector<ListState>(listFeatureKey);

export class ListSelectors {
  static readonly searchResults = createSelector(
    featureSelector,
    (state) => state.searchResult,
  );
}
