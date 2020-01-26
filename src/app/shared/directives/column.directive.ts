import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { isBetween, isNumericType } from '../helpers/number.helper';

export const MIN_VALUE = 1;
export const MAX_VALUE = 12;

@Directive({
  selector: '[column]'
})
export class ColumnDirective implements OnInit {

  @Input('column')
  xs: number;

  @Input()
  sm: number;

  @Input()
  md: number;

  @Input()
  lg: number;

  @Input()
  xl: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.validateProperties();

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

  private validateProperties(): boolean {
    if (
      Object.values(this)
        .filter(isNumericType)
        .some(isBetween(MIN_VALUE, MAX_VALUE))
    ) {
      return;
    }

    throw new Error(`ColumnDirective: @Input has received some invalid values. Proper values should be between 1 and 12.`);
  }
}
