import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { getApplicationConfig } from './app/app.config';

import { environment } from './environments/environment';

fetch(environment.configUrl)
  .then((res) => res.json())
  .then((config) => {
    if (environment.production) {
      enableProdMode();
    }

    if (!environment.production) {
      console.log('Running with config', config);
    }

    const applicationConfig = getApplicationConfig(config);

    bootstrapApplication(AppComponent, applicationConfig).catch((err) =>
      console.error(err),
    );
  });
