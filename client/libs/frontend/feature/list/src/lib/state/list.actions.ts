import { createAction, props } from '@ngrx/store';
import { LookupItem } from '../models/list.models';

const actionPrefix = '[List]';

export class ListActions {
  static readonly lookupItems = createAction(
    `${actionPrefix} Lookup Items`,
    props<{ searchValue: string | null }>(),
  );

  static readonly lookupItemsSuccess = createAction(
    `${actionPrefix} Lookup Items Success`,
    props<{ searchResult: LookupItem[] }>(),
  );
}
