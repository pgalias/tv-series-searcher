import { PropertyMap } from '../decorators/property-map.decorator';

export class Series {
  @PropertyMap('show.id')
  id: number = null;

  @PropertyMap('show.image.medium')
  cover: string = null;

  @PropertyMap('show.name')
  name: string = null;

  @PropertyMap('show.rating.average')
  rating: number = null;

  @PropertyMap('show.summary')
  summary: string = null;

  @PropertyMap('show.genres')
  genres: string[] = [];

  @PropertyMap('show.externals.imdb')
  external: string = null;

  isFavourite = false;
}
