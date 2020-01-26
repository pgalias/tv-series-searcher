import { ElementRef } from '@angular/core';
import using from 'jasmine-data-provider';
import { ColumnDirective, MAX_VALUE, MIN_VALUE } from './column.directive';

describe('ColumnDirective', () => {
  let directive: ColumnDirective;
  let element: HTMLDivElement;
  let elementRef: ElementRef;

  beforeEach(() => {
    element = document.createElement('div');
    elementRef = new ElementRef<HTMLDivElement>(element);
    directive = new ColumnDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should has proper classes corresponding to provided attributes', () => {
    using([
      { styles: { xs: 3, sm: 6 }, contains: ['xs-3', 'sm-6'] },
      { styles: { sm: 4, xl: 10 }, contains: ['sm-4', 'xl-10'] },
      { styles: { md: 6 }, contains: ['md-6'] },
      { styles: { xs: 12, sm: 8, md: 6, lg: 4, xl: 1 }, contains: ['md-6', 'xs-12', 'sm-8', 'lg-4', 'xl-1'] },
    ], ({ styles, contains }) => {
      Object.assign(directive, styles);
      directive.ngOnInit();
      expect(element.classList.value.split(' ').some(className => contains.includes(className))).toBeTruthy();
    });
  });

  it('should throw an error when received incorrect values', () => {
    using([
      { value: MIN_VALUE - 1, shouldThrow: true },
      { value: MAX_VALUE + 1, shouldThrow: true },
      { value: MAX_VALUE, shouldThrow: false },
      { value: MAX_VALUE, shouldThrow: false },
    ], ({ value, shouldThrow }) => {
      Object.assign(directive, { xs: value });
      if (shouldThrow) {
        expect(() => directive.ngOnInit()).toThrow();
      } else {
        expect(() => directive.ngOnInit()).not.toThrow();
      }
    });
  });
});
