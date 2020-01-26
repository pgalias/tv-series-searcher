import { toNumber, isNaN, isFinite } from 'lodash';

export function isBetween(min: number, max: number): (value: number) => boolean {
  return (value: number) => value >= min && value <= max;
}

export function isNumericType(value: string | number): boolean {
  const parsed = toNumber(value);

  return !isNaN(parsed) && isFinite(parsed);
}
