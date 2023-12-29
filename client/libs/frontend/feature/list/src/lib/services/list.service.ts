import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpService } from '@bookish-list/shared/common/http';
import { Observable } from 'rxjs';
import { LookupItem } from '../models/list.models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly httpService = inject(HttpService);

  lookupItem(searchValue: string): Observable<LookupItem[]> {
    const url = '/api/v1/lookup';
    const params = new HttpParams().set('searchValue', searchValue);

    return this.httpService.get(url, { params });
  }
}
