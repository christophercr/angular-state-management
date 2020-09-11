import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';

import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
