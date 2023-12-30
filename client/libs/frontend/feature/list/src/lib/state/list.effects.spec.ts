import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMock } from '@bookish-list/shared/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LookupItem } from '../models/list.models';
import { ListService } from '../services/list.service';
import { ListActions } from './list.actions';
import * as listEffects from './list.effects';

describe('ListEffects', () => {
  let actions$: Observable<Action>;
  let listService: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$), provideMock(ListService)],
    });

    listService = TestBed.inject(ListService);
  });

  describe('lookupItems$', () => {
    it('should lookup items', waitForAsync(() => {
      // arrange
      const searchValue = 'My Search Value';
      const searchResult: LookupItem[] = [
        {
          isbn: 'isbn',
          title: 'My Title',
          author: 'Some Author',
          category: 'Any Category',
          thumbnailUrl: 'my/thumbnail',
        },
      ];
      const lookupItemsSpy = jest
        .spyOn(listService, 'lookupItems')
        .mockReturnValue(of(searchResult));

      actions$ = of(ListActions.lookupItems({ searchValue }));

      // act
      const result$ = TestBed.runInInjectionContext(() =>
        listEffects.lookupItems$(),
      );

      // assert
      result$.subscribe((result) => {
        expect(result).toEqual(
          ListActions.lookupItemsSuccess({ searchResult }),
        );
        expect(lookupItemsSpy).toHaveBeenCalledWith(searchValue);
      });
    }));
  });
});
