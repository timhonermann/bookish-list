import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly authService = inject(AuthService);

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  login(): Observable<void> {
    return this.authService.loginWithRedirect();
  }

  logout(): Observable<void> {
    return this.authService.logout();
  }
}
