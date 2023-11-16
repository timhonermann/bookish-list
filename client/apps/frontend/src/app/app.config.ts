import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { authEffects } from '@bookish-list/frontend/shared/auth';
import {
  APP_CONFIG,
  AppConfig,
  serverUrlInterceptor,
} from '@bookish-list/shared/common/http';
import { IconService } from '@bookish-list/shared/ui/icons';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  LogLevel,
  OidcSecurityService,
  provideAuth,
} from 'angular-auth-oidc-client';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

function initializeAppFactory(
  oidcSecurityService: OidcSecurityService,
  iconService: IconService
): () => Observable<void> {
  return () =>
    oidcSecurityService.checkAuth().pipe(
      tap(() => iconService.init()),
      map(() => undefined)
    );
}

export function getApplicationConfig(config: AppConfig): ApplicationConfig {
  return {
    providers: [
      importProvidersFrom(BrowserModule),
      provideAuth({
        config: {
          authority: config.domain,
          clientId: config.clientId,
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          scope: 'openid profile email offline_access',
          responseType: 'code',
          silentRenew: true,
          useRefreshToken: true,
          ignoreNonceAfterRefresh: true,
          customParamsAuthRequest: {
            audience: config.audience,
          },
          logLevel: LogLevel.Warn,
        },
      }),
      provideStore({}),
      provideEffects(authEffects),
      provideStoreDevtools({
        name: 'Bookish List',
        logOnly: environment.production,
      }),
      provideHttpClient(withInterceptors([serverUrlInterceptor()])),
      {
        provide: APP_CONFIG,
        useValue: config,
      },
      {
        provide: APP_INITIALIZER,
        useFactory: initializeAppFactory,
        deps: [OidcSecurityService, IconService],
        multi: true,
      },
      provideRouter(appRoutes),
      provideAnimations(),
    ],
  };
}
