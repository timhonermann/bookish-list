import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMock } from '@bookish-list/shared/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AuthActions } from './auth.actions';
import { login$, logout$ } from './auth.effects';

describe('AuthEffects', () => {
  let actions: Observable<unknown>;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions),
        provideMock(AuthenticationService),
      ],
    });

    authenticationService = TestBed.inject(AuthenticationService);
  });

  describe('login$', () => {
    it('should create', () => {
      expect(login$).toBeTruthy();
    });

    it('should login user', waitForAsync(() => {
      // arrange
      const loginSpy = jest
        .spyOn(authenticationService, 'login')
        .mockReturnValue(of(undefined));

      actions = of(AuthActions.login());

      // act
      const result$ = TestBed.runInInjectionContext(() => login$());

      // assert
      result$.subscribe(() => {
        expect(loginSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('logout$', () => {
    it('should create', () => {
      expect(logout$).toBeTruthy();
    });

    it('should logout user', waitForAsync(() => {
      // arrange
      const logoutSpy = jest
        .spyOn(authenticationService, 'logout')
        .mockReturnValue(of(undefined));

      actions = of(AuthActions.logout());

      // act
      const result$ = TestBed.runInInjectionContext(() => logout$());

      // assert
      result$.subscribe(() => {
        expect(logoutSpy).toHaveBeenCalled();
      });
    }));
  });
});
