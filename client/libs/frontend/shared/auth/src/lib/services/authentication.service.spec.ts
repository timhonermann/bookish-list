import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMock } from '@bookish-list/shared/testing';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let oidcSecurityService: OidcSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMock(OidcSecurityService)],
    });

    oidcSecurityService = TestBed.inject(OidcSecurityService);
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call authorize', () => {
      // arrange
      const spy = jest.spyOn(oidcSecurityService, 'authorize');

      // act
      service.login();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call logout', waitForAsync(() => {
      // arrange
      const spy = jest
        .spyOn(oidcSecurityService, 'logoff')
        .mockReturnValue(of(undefined));

      // act
      const result$ = service.logout();

      // assert
      result$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
      });
    }));
  });

  describe('checkAuth', () => {
    it('should call checkAuth', waitForAsync(() => {
      // arrange
      const sub = 'gdata|123';
      const loginResponse = {
        userData: {
          sub,
        },
      } as LoginResponse;

      jest
        .spyOn(oidcSecurityService, 'checkAuth')
        .mockReturnValue(of(loginResponse));

      // act
      const result$ = service.checkAuth();

      // assert
      result$.subscribe((result) => {
        expect(result).toEqual(sub);
      });
    }));
  });
});
