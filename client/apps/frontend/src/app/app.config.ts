import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AuthConfig, AuthModule, provideAuth0 } from '@auth0/auth0-angular';
import { authEffects } from '@bookish-list/frontend/shared/auth';
import {
  APP_CONFIG,
  AppConfig,
  serverUrlInterceptor,
} from '@bookish-list/shared/common/http';
import { IconService } from '@bookish-list/shared/ui/icons';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';

function getAuth0Config(config: AppConfig): AuthConfig {
  return {
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: config.audience,
    },
  };
}

function initializeAppFactory(iconService: IconService): () => void {
  return () => {
    iconService.init();
  };
}

export function getApplicationConfig(config: AppConfig): ApplicationConfig {
  return {
    providers: [
      provideAuth0(),
      importProvidersFrom(
        BrowserModule,
        AuthModule.forRoot(getAuth0Config(config))
      ),
      provideStore({}),
      provideEffects(authEffects),
      provideHttpClient(withInterceptors([serverUrlInterceptor()])),
      {
        provide: APP_CONFIG,
        useValue: config,
      },
      {
        provide: APP_INITIALIZER,
        useFactory: initializeAppFactory,
        deps: [IconService],
        multi: true,
      },
      provideRouter(appRoutes),
      provideAnimations(),
    ],
  };
}
