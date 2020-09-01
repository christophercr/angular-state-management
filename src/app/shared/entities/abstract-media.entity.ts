import {Genre} from '../enums/genre.enum';

export abstract class Media {
  protected constructor(
    public name: string,
    public description: string,
    public pictureLocation: string,
    public genre: Genre,
    identifier?: string,
  ) {
    if (identifier) {
      this.identifier = identifier;
    } else {
      // this is just for the example; for any real project, use
      // UUIDs instead: https://www.npmjs.com/package/uuid
      this.identifier = Math.random().toString(36).substr(2, 9);
    }
  }

  public identifier: string;
}
