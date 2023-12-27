import { inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  get isAuthenticated$(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((res) => res.isAuthenticated),
    );
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): Observable<void> {
    return this.oidcSecurityService.logoff().pipe(map(() => undefined));
  }

  checkAuth(): Observable<string | null> {
    return this.oidcSecurityService
      .checkAuth()
      .pipe(map((res) => res?.userData?.sub ?? null));
  }
}
