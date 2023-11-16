import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { FrontendRoutes } from '@bookish-list/frontend/shared/globals';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const authenticationService = inject(AuthenticationService);

  const router = inject(Router);

  return authenticationService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      return router.parseUrl(FrontendRoutes.AUTH);
    })
  );
};
