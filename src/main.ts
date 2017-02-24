import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { CarModule } from './car/car.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CarModule);
