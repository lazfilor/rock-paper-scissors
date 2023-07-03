import {Component, Input} from '@angular/core';

@Component({
  selector: 'rps-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent {

  @Input()
  public controlId?: string;

  @Input()
  public controlName?: string;

  @Input()
  public isControlHidden: boolean = false;

  @Input()
  public controlAssetUrl?: string;
}
