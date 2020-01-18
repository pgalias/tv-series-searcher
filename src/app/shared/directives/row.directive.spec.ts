import { ElementRef } from '@angular/core';
import using from 'jasmine-data-provider';
import { RowDirective } from './row.directive';

describe('RowDirective', () => {
  let directive: RowDirective;
  let element: HTMLDivElement;
  let elementRef: ElementRef;

  beforeEach(() => {
    element = document.createElement('div');
    elementRef = new ElementRef<HTMLDivElement>(element);
    directive = new RowDirective(elementRef);
  });

  it('should create an instance', () => {
    directive.ngOnInit();
    expect(directive).toBeTruthy();
    expect(element.classList.contains('row')).toBeTruthy();
  });

  it('should has proper classes corresponding to provided attributes', () => {
    using([
      {
        align: {
          align: 'start center'
        },
        contains: ['align-start-center']
      }, {
        align: {
          align: 'center',
          alignSm: 'end'
        },
        contains: ['align-center-stretch', 'align-sm-end-stretch']
      }, {
        align: {
          align: 'center',
          alignSm: 'end',
          alignXl: 'between '
        },
        contains: ['align-center-stretch', 'align-sm-end-stretch', 'align-xl-between-stretch']
      }, {
        align: {
          align: 'center',
          alignSm: 'end',
          alignXl: 'between start'
        },
        contains: ['align-center-stretch', 'align-sm-end-stretch', 'align-xl-between-start']
      },
    ], ({ align, contains }) => {
      Object.assign(directive, align);
      directive.ngOnInit();
      expect(element.classList.value.split(' ').some(className => contains.includes(className))).toBeTruthy();
    });
  });
});
