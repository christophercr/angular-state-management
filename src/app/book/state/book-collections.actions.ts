import {MediaCollection} from "../../shared/entities/media-collection.entity";
import {Book} from "../entities/book.entity";

export class LoadBookCollectionAction {
  static readonly type = '[BookCollections] Load collection';

  constructor() {
  }
}

export class LoadBookCollectionSuccessAction {
  static readonly type = '[BookCollections] Load collection success';

  constructor(public collection: MediaCollection<Book>) {
  }
}

export class CreateBookAction {
  static readonly type = '[BookCollections] Create book';

  constructor(public newBook: Book, public collectionId: string) {
  }
}

export class CreateBookSuccessAction {
  static readonly type = '[BookCollections] Create book success';

  constructor(public modifiedCollection: MediaCollection<Book>) {
  }
}

export class CreateBookFailureAction {
  static readonly type = '[BookCollections] Create book failure';

  constructor(public error: any) {
  }
}
