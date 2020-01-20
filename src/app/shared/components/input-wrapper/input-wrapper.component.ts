import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss']
})
export class InputWrapperComponent implements AfterViewInit {

  @ViewChild('content', {static: false}) content: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const element: HTMLElement = this.content.nativeElement;
    const inputsCount: number = element.querySelectorAll('input, textarea, select').length;

    if (!element.hasChildNodes() || inputsCount === 0) {
      throw new Error(`${this.constructor.name}: Component requires at least one input type element.`);
    }
  }

}
