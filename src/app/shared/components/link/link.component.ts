import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lnk',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() address: string;
  @Input() openInNewWindow: boolean;

  ngOnInit(): void {
    if (!this.address) {
      throw new Error('LnkComponent: address property is required.');
    }

    try {
      new URL(this.address);
    } catch {
      throw new Error('LnkComponent: address property is not valid hyperlink.');
    }
  }
}
