import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ListService } from '../services/list.service';
import { ListActions } from './list.actions';

export const lookupItems$ = createEffect(
  (actions$ = inject(Actions), listService = inject(ListService)) =>
    actions$.pipe(
      ofType(ListActions.lookupItems),
      switchMap(({ searchValue }) =>
        listService
          .lookupItems(searchValue)
          .pipe(
            map((searchResult) =>
              ListActions.lookupItemsSuccess({ searchResult }),
            ),
          ),
      ),
    ),
  { functional: true },
);
