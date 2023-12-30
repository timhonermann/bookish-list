import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpService } from '@bookish-list/shared/common/http';
import { Observable, of } from 'rxjs';
import { LookupItem } from '../models/list.models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly httpService = inject(HttpService);

  lookupItems(searchValue: string | null): Observable<LookupItem[]> {
    if (!searchValue) {
      return of([]);
    }

    const url = '/api/v1/lookup';
    const params = new HttpParams().set('searchValue', searchValue);

    return this.httpService.get(url, { params });
  }
}
