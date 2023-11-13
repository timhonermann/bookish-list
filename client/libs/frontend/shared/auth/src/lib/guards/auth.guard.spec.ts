import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FrontendRoutes } from '@bookish-list/frontend/shared/globals';
import { provideMock } from '@bookish-list/shared/testing';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMock(AuthenticationService)],
    });

    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('should redirect to login URL if not authenticated', waitForAsync(() => {
    jest
      .spyOn(authenticationService, 'isAuthenticated$', 'get')
      .mockReturnValue(of(false));
    const spy = jest.spyOn(router, 'parseUrl');
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: 'test-url' } as RouterStateSnapshot;

    const canActivate$ = TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    ) as Observable<boolean>;

    canActivate$.subscribe(() => {
      expect(spy).toHaveBeenNthCalledWith(1, FrontendRoutes.AUTH);
    });
  }));

  it('should return true if authenticated', waitForAsync(() => {
    jest
      .spyOn(authenticationService, 'isAuthenticated$', 'get')
      .mockReturnValue(of(true));
    const spy = jest.spyOn(router, 'parseUrl');
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: 'test-url' } as RouterStateSnapshot;

    const canActivate$ = TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    ) as Observable<boolean>;

    canActivate$.subscribe(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  }));
});
