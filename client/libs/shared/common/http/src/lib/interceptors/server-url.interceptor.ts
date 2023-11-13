import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_CONFIG } from '../models/config.models';

export function serverUrlInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const config = inject(APP_CONFIG);

    if (req.url.startsWith('assets')) {
      return next(req);
    }

    if (req.url.startsWith('http')) {
      return next(req);
    }

    const serverUrlRequest = req.clone({
      url: `${config.serverUrl}${req.url}`,
    });

    return next(serverUrlRequest);
  };
}
