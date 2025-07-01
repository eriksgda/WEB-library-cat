import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {Cat, LucideAngularModule, Search, Trash, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick(
      { Cat, Search, Trash, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft }))
  ]
};
