import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faStar as sFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as rFaStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss']
})
export class FavouriteButtonComponent {
  @Input() state: boolean;
  @Output() toggle = new EventEmitter<void>();

  public favourite = sFaStar;
  public unfavourite = rFaStar;

}
