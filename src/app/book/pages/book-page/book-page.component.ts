import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MediaCollection} from "../../../shared/entities/media-collection.entity";
import {BookService} from "../../services/book.service";
import {Book} from "../../entities/book.entity";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, OnDestroy {

  public formControl: FormControl;
  public bookCollections: Map<string, MediaCollection<Book>>;
  private bookCollectionsSubs: Subscription;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookCollectionsSubs = this.bookService.bookCollections$.subscribe((currentCollections) => {
      this.bookCollections = currentCollections;
    });

    this.formControl = new FormControl('', Validators.required);
    this.bookService.reloadBookCollections();
  }

  ngOnDestroy() {
    this.bookCollectionsSubs.unsubscribe();
  }

  createBookCollection(): void {
    if (this.formControl.valid) {
      this.bookService.createBookCollection(this.formControl.value);
      this.formControl.reset();
    }
  }

  removeBookCollection(identifier: string): void {
    this.bookService.removeBookCollection(identifier);
  }

  createBook(book: Book, collectionIdentifier: string): void {
    this.bookService.createBook(collectionIdentifier, book);
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    this.bookService.removeBook(collectionIdentifier, bookIdentifier);
  }

  reloadBookCollections(): void {
    this.bookService.reloadBookCollections();
  }

  trackById(index: number, collection: MediaCollection<Book>): string {
    return collection.identifier;
  }
}
