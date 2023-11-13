import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  serverUrl: string;
  domain: string;
  clientId: string;
  audience: string;
}
