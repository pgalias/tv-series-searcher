import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { isNumber } from 'lodash';

import Predicate from '../decorators/predicate.decorator';
import { isBetween } from '../helpers/number.helper';

const validateProperty = (value: number): boolean => !value || (isNumber(value) && isBetween(value, 1, 12));

@Directive({
  selector: '[column]'
})
export class ColumnDirective implements OnInit {

  @Predicate(validateProperty)
  @Input('column')
  xs: number;

  @Predicate(validateProperty)
  @Input()
  sm: number;

  @Predicate(validateProperty)
  @Input()
  md: number;

  @Predicate(validateProperty)
  @Input()
  lg: number;

  @Predicate(validateProperty)
  @Input()
  xl: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    (this.el.nativeElement as HTMLElement).classList.add(...this.resolveClasses());
  }

  private resolveClasses(): string[] {
    return [
      `xs-${this.xs}`,
      `sm-${this.sm}`,
      `md-${this.md}`,
      `lg-${this.lg}`,
      `xl-${this.xl}`,
    ].filter((value: string) => !value.includes('-undefined'));
  }
}
