import { Series } from '../models/series';

export const createSeries = (params: Partial<Series>): Series => Object.assign(new Series(), params);
