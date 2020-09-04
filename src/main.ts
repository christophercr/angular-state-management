import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ObservableStore} from "@codewithdan/observable-store";
import {ReduxDevToolsExtension} from "@codewithdan/observable-store-extensions";

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  // enable the ReduxDevTools only in production!
  ObservableStore.globalSettings = {
    trackStateHistory: true,
    logStateChanges: true
  };
  ObservableStore.addExtension(new ReduxDevToolsExtension());
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
