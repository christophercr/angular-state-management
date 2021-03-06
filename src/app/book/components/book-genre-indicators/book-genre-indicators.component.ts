import {Component, OnInit} from '@angular/core';
import {Genre} from "../../../shared/enums/genre.enum";
import {MediaCollection} from "../../../shared/entities/media-collection.entity";
import {BookService} from "../../services/book.service";
import {Book} from "../../entities/book.entity";

@Component({
  selector: 'app-genre-indicators',
  templateUrl: './book-genre-indicators.component.html',
  styleUrls: ['./book-genre-indicators.component.scss']
})
export class BookGenreIndicatorsComponent implements OnInit {

  public genreCounters: Map<Genre, number>;
  public genres: Genre[];
  public bookCollections: Map<string, MediaCollection<Book>>;

  constructor(private bookService: BookService) {
    this.bookCollections = this.bookService.bookCollections;
  }

  ngOnInit(): void {
    this.updateGenreCounters();
    this.genres = Array.from(this.genreCounters.keys())
  }

  public updateGenreCounters() {
    this.genreCounters = this.getGenreCounters();
  }

  public getGenreCounters(): Map<Genre, number> {
    const tempCounters = this.getPristineGenresCounterMap();

    this.bookCollections.forEach((bookCollection, collectionName) => {
      for (const book of bookCollection.collection) {
        tempCounters.set(book.genre, tempCounters.get(book.genre) + 1);
      }
    });

    return tempCounters;
  }

  public getPristineGenresCounterMap(): Map<Genre, number> {
    return new Map<Genre, number>([
      [Genre.Fantastic, 0],
      [Genre.Fiction, 0],
      [Genre.Horror, 0],
      [Genre.Romance, 0],
      [Genre.Thriller, 0],
    ]);
  }

}
