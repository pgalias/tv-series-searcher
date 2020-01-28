import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() currentPage: number;
  @Input() pagesCount: number;
  @Output() onPageChange = new EventEmitter<number>();

  public pages: number[];

  public prevButton = faChevronLeft;
  public nextButton = faChevronRight;

  constructor() { }

  ngOnChanges(): void {
    this.pages = Array(this.pagesCount).fill(0).map((v, i) => i + 1);
  }

  get prevDisabled(): boolean {
    return this.currentPage <= 1;
  }

  get nextDisabled(): boolean {
    return this.currentPage >= this.pagesCount;
  }
}
