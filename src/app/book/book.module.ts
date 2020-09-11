import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BookNewComponent} from './components/book-new/book-new.component';
import {BookGenreIndicatorsComponent} from './components/book-genre-indicators/book-genre-indicators.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookPageComponent} from './pages/book-page/book-page.component';
import {SharedModule} from '../shared/shared.module';
import * as fromBook from './reducers';
import {BookEffects} from './effects/book.effects';

@NgModule({
  declarations: [BookPageComponent, BookNewComponent, BookListComponent, BookGenreIndicatorsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromBook.bookFeatureKey, fromBook.reducers, {metaReducers: fromBook.metaReducers}),
    EffectsModule.forFeature([BookEffects]),
  ],
  exports: [BookPageComponent]
})
export class BookModule {
}
