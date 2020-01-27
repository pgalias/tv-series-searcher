import { PropertyMap } from '../decorators/property-map.decorator';
import { Id } from './id';

export class Series {
  readonly id: Id = null;

  @PropertyMap('image.medium')
  readonly cover: string = null;

  readonly name: string = null;

  @PropertyMap('rating.average')
  readonly rating: number = null;

  readonly summary: string = null;

  @PropertyMap('genres')
  readonly genres: string[] = [];

  @PropertyMap('externals.imdb')
  readonly external: string = null;

  readonly isFavourite: boolean = null;
}
