import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {BookNewComponent} from './components/book-new/book-new.component';
import {BookGenreIndicatorsComponent} from './components/book-genre-indicators/book-genre-indicators.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookPageComponent} from './pages/book-page/book-page.component';
import {SharedModule} from '../shared/shared.module';
import * as fromBook from './reducers';

@NgModule({
  declarations: [BookPageComponent, BookNewComponent, BookListComponent, BookGenreIndicatorsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromBook.bookFeatureKey, fromBook.reducers, { metaReducers: fromBook.metaReducers })
  ],
  exports: [BookPageComponent]
})
export class BookModule {
}
