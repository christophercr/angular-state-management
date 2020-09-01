import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookGenreIndicatorsComponent} from './book-genre-indicators.component';

describe('GenreIndicatorsComponent', () => {
  let component: BookGenreIndicatorsComponent;
  let fixture: ComponentFixture<BookGenreIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookGenreIndicatorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookGenreIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
