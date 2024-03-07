import { LookupItem } from '../models/list.models';

export const listFeatureKey = 'list';

export interface ListState {
  searchResult: LookupItem[];
  isLoading: boolean;
}

export const initialListState: ListState = {
  searchResult: [],
  isLoading: false,
};
