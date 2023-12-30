import { HttpParams } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from '@bookish-list/shared/common/http';
import { provideMock } from '@bookish-list/shared/testing';
import { of } from 'rxjs';
import { LookupItem } from '../models/list.models';

import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMock(HttpService)],
    });

    httpService = TestBed.inject(HttpService);
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('lookupItem', () => {
    it('should return list of lookup items', waitForAsync(() => {
      // arrange
      const searchValue = '123';
      const params = new HttpParams().set('searchValue', searchValue);
      const lookupItems: LookupItem[] = [
        {
          isbn: '123',
          author: 'Test Foo',
          category: 'Fantasy',
          title: 'Some Title',
          thumbnailUrl: 'some/url',
        },
      ];
      const getSpy = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(lookupItems));

      // act
      const result$ = service.lookupItems(searchValue);

      // assert
      result$.subscribe((result) => {
        expect(result).toEqual(lookupItems);
        expect(getSpy).toHaveBeenCalledWith('/api/v1/lookup', { params });
      });
    }));

    it('should return empty list when searchValue is null', waitForAsync(() => {
      // arrange
      const searchValue = null;

      // act
      const result$ = service.lookupItems(searchValue);

      // assert
      result$.subscribe((result) => {
        expect(result).toEqual([]);
      });
    }));
  });
});
