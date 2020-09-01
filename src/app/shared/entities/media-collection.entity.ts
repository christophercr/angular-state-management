import {Media} from './abstract-media.entity';
import {Type} from 'class-transformer';

export class MediaCollection<T extends Media> {
  private readonly _type: Function;

  constructor(
    type: Function,
    name?: string,
    identifier?: string
  ) {
    this._type = type;

    if (name) {
      this.name = name;
    }

    if (identifier) {
      this.identifier = identifier;
    } else {
      // this is just for the example; for any real project, use
      // UUIDs instead: https://www.npmjs.com/package/uuid
      this.identifier = Math.random().toString(36).substr(2, 9);
    }
  }

  public identifier: string;

  public name = '';

  @Type(options => {
    if (options) {
      return (options.newObject as MediaCollection<T>)._type;
    } else {
      throw new Error('Cannot not determine the type because the options object is null or undefined');
    }
  })
  public collection: ReadonlyArray<T> = [];

  addMedia(media: Readonly<T>): void {
    if (media) {
      this.collection = this.collection.concat(media);
    }
  }

  removeMedia(itemId: string) {
    if (itemId) {
      this.collection = this.collection.filter(item => {
        return item.identifier !== itemId;
      });
    }
  }
}
