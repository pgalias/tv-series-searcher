import { toNumber, isNaN, isFinite } from 'lodash';

export function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

export function isNumericType(value: string | number): boolean {
  const parsed = toNumber(value);

  return !isNaN(parsed) && isFinite(parsed);
}
