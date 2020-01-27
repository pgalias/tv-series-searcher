import { PropertyMap } from '../decorators/property-map.decorator';
import { Id } from './id';

export class Series {
  @PropertyMap('show.id')
  readonly id: Id = null;

  @PropertyMap('show.image.medium')
  readonly cover: string = null;

  @PropertyMap('show.name')
  readonly name: string = null;

  @PropertyMap('show.rating.average')
  readonly rating: number = null;

  @PropertyMap('show.summary')
  readonly summary: string = null;

  @PropertyMap('show.genres')
  readonly genres: string[] = [];

  @PropertyMap('show.externals.imdb')
  readonly external: string = null;

  readonly isFavourite: boolean = null;
}
