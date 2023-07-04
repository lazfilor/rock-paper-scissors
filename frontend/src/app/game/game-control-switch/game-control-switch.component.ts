import {Component, Input} from '@angular/core';
import {GameControl} from '../../shared/game-control';

@Component({
  selector: 'rps-game-control-switch',
  templateUrl: './game-control-switch.component.html',
  styleUrls: ['./game-control-switch.component.scss']
})
export class GameControlSwitchComponent {

  @Input({required: true})
  gameControls: GameControl[] = [];

  printSelected(e: GameControl) {
    window.alert(JSON.stringify(e));
  }
}
