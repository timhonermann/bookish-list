import { LookupItem } from '../models/list.models';
import { ListActions } from './list.actions';
import { listReducer } from './list.reducer';
import { initialListState } from './list.state';

describe('List Reducer', () => {
  describe('lookupItemSuccess', () => {
    it('should set search result', () => {
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
      const action = ListActions.lookupItemsSuccess({ searchResult });

      // act
      const result = listReducer(initialListState, action);

      // assert
      expect(result.searchResult).toEqual(searchResult);
    });
  });
});
