import { TruncatePipe } from './truncate.pipe';
import using from 'jasmine-data-provider';

describe('TruncatePipe', () => {
  it('should truncate string to given amount of characters without last word', () => {
    using([
      { str: 'Lorem ipsum dolor sit amet, consectetur', amount: 20, shouldBe: 'Lorem ipsum dolor sit...' },
      { str: 'Lorem ipsum dolor sit ', amount: 20, shouldBe: 'Lorem ipsum dolor sit' },
      { str: 'Lorem ipsum dolor sit', amount: 20, shouldBe: 'Lorem ipsum dolor sit' },
      { str: 'Lorem ipsum dolor si', amount: 20, shouldBe: 'Lorem ipsum dolor si' },
      { str: 'Lorem ipsum dolor s ', amount: 20, shouldBe: 'Lorem ipsum dolor s' },
      { str: '', amount: 20, shouldBe: '' },
      { str: null, amount: 20, shouldBe: '' },
    ], ({ str, amount, shouldBe }) => {
      const truncatePipe = new TruncatePipe();
      expect(truncatePipe.transform(str, amount)).toBe(shouldBe);
    });
  });
});
