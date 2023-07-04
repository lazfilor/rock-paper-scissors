import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameControl} from '../../shared/game-control';

@Component({
  selector: 'rps-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent {

  @Input()
  controlId?: string;

  @Input()
  controlName?: string;

  @Input()
  controlAssetUrl?: string;

  @Output() controlSelectEvent = new EventEmitter<GameControl>();

  selectControl() {

    if (this.controlId !== undefined && this.controlName !== undefined && this.controlAssetUrl !== undefined) {
      this.controlSelectEvent.emit({id: this.controlId, name: this.controlName, assetPath: this.controlAssetUrl});
    }
  }
}
