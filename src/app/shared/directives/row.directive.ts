import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[row]'
})
export class RowDirective implements OnInit {

  @Input() align: string;
  @Input() alignSm: string;
  @Input() alignMd: string;
  @Input() alignLg: string;
  @Input() alignXl: string;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const classes = this.resolveClasses().concat(['row']);

    (this.el.nativeElement as HTMLElement).classList.add(...classes);
  }

  private resolveAlign(align): string {
    if (!align) {
      return;
    }

    const axises = align.split(' ').filter(Boolean);
    if (axises.length === 1) {
      axises.push('stretch');
    }

    return axises.join('-');
  }

  private resolveClasses(): string[] {
    return [
      `align-${this.resolveAlign(this.align)}`,
      `align-sm-${this.resolveAlign(this.alignSm)}`,
      `align-md-${this.resolveAlign(this.alignMd)}`,
      `align-lg-${this.resolveAlign(this.alignLg)}`,
      `align-xl-${this.resolveAlign(this.alignXl)}`,
    ].filter((value: string) => !value.includes('-undefined'));
  }
}
