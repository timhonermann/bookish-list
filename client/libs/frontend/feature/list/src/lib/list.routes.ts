import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ListComponent } from './containers/list/list.component';
import * as listEffects from './state/list.effects';
import { listReducer } from './state/list.reducer';
import { listFeatureKey } from './state/list.state';

export const LIST_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
    providers: [
      provideState(listFeatureKey, listReducer),
      provideEffects(listEffects),
    ],
  },
];
