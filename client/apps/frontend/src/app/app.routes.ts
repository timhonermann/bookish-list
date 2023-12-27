import { Routes } from '@angular/router';
import { authGuard } from '@bookish-list/frontend/shared/auth';
import { FrontendRoutes } from '@bookish-list/frontend/shared/globals';
import { ShellComponent } from './containers/shell/shell.component';

export const appRoutes: Routes = [
  {
    path: FrontendRoutes.AUTH,
    loadChildren: () =>
      import('@bookish-list/frontend/feature/auth').then(
        (lib) => lib.AUTH_ROUTES,
      ),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: FrontendRoutes.LIST,
        loadChildren: () =>
          import('@bookish-list/frontend/feature/list').then(
            (lib) => lib.LIST_ROUTES,
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: FrontendRoutes.LIST,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
