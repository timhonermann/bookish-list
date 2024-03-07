import { LookupItem } from '../models/list.models';
import { ListSelectors } from './list.selectors';
import { listFeatureKey, ListState } from './list.state';

describe('List Selectors', () => {
  describe('searchResults', () => {
    it('should select search result', () => {
      // arrange
      const searchResult: LookupItem[] = [
        {
          isbn: 'Some ISBN',
          title: 'Wolf of Wallstreet',
          category: 'Finance',
          author: 'Jordan Belfort',
          thumbnailUrl: 'my.thumbnail.ch/123',
        },
      ];

      const state = {
        [listFeatureKey]: {
          searchResult,
        } as ListState,
      };

      // act
      const result = ListSelectors.searchResults(state);

      // assert
      expect(result).toEqual(searchResult);
    });
  });

  describe('isLoading', () => {
    it('should select isLoading', () => {
      // arrange
      const isLoading = true;

      const state = {
        [listFeatureKey]: {
          isLoading,
        } as ListState,
      };

      // act
      const result = ListSelectors.isLoading(state);

      // assert
      expect(result).toEqual(isLoading);
    });
  });
});
