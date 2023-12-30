import { LookupItem } from '../models/list.models';

export const listFeatureKey = 'list';

export interface ListState {
  searchResult: LookupItem[];
}

export const initialListState: ListState = {
  searchResult: [],
};
