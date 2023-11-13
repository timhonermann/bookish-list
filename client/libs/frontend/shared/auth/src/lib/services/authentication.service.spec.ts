import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';

class AuthServiceMock {
  isAuthenticated$ = of(null);

  user$ = of({});

  loginWithRedirect = jest.fn();

  logout = jest.fn();
}

describe('AuthService', () => {
  let service: AuthenticationService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call loginWithRedirect', () => {
      // arrange
      const spy = jest.spyOn(authService, 'loginWithRedirect');

      // act
      service.login();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call logout', () => {
      // arrange
      const spy = jest.spyOn(authService, 'logout');

      // act
      service.logout();

      // assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
