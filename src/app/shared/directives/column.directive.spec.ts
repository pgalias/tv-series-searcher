import { ElementRef } from '@angular/core';
import using from 'jasmine-data-provider';
import { ColumnDirective } from './column.directive';

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
      { styles: { xs: 12, sm: 8, md: 6, lg: 4, xl: 3 }, contains: ['md-6', 'xs-12', 'sm-8', 'lg-4', 'xl-3'] },
    ], ({ styles, contains }) => {
      Object.assign(directive, styles);
      directive.ngOnInit();
      expect(element.classList.value.split(' ').some(className => contains.includes(className))).toBeTruthy();
    });
  });
});
