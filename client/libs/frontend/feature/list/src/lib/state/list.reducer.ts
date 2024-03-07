import { createReducer, on } from '@ngrx/store';
import { ListActions } from './list.actions';
import { initialListState } from './list.state';

export const listReducer = createReducer(
  initialListState,

  on(ListActions.lookupItemsSuccess, (state, { searchResult }) => ({
    ...state,
    searchResult,
    isLoading: false,
  })),

  on(ListActions.lookupItems, (state) => ({
    ...state,
    isLoading: true,
  })),
);
