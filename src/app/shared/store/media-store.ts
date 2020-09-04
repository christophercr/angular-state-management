import {MediaCollection} from "../entities/media-collection.entity";
import {Media} from "../entities/abstract-media.entity";

export interface MediaStoreState<T extends Media> {
  collections: MediaCollection<T>[];
}
