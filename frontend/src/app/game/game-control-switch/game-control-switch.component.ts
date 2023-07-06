import {Component, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {GameControl} from '../../shared/game-control';
import {GameControlComponent} from '../game-control/game-control.component';

@Component({
  selector: 'rps-game-control-switch',
  templateUrl: './game-control-switch.component.html',
  styleUrls: ['./game-control-switch.component.scss']
})
export class GameControlSwitchComponent {

  @Input({required: true})
  gameControls: GameControl[] = [];

  @Output() selectEmitter: EventEmitter<GameControl> = new EventEmitter<GameControl>();

  hasSelection: boolean = false;

  @ViewChildren('control') controlsComponents!: QueryList<GameControlComponent>;

  /**
   * Resets switch and makes it accept new selections
   */
  reset() {
    this.controlsComponents
      .forEach(c => {

        if (c.isRevealed) {
          c.unselect();
        } else {
          c.reveal();
        }
      })
    this.hasSelection = false;
  }

  /**
   * Hides components that were not selected, communicates choice to parents and prevents subsequent selections until component is reset
   * @param e - contains data of the selected game component
   */
  handleSelect(e: GameControl) {

    if (this.hasSelection) {
      //do not allow subsequent selections in case selection was already made and is being processed by parent
      return;
    }
    this.selectEmitter.emit(e);
    this.controlsComponents
      .filter(c => c.isRevealed)
      .forEach(c => {

        if (c.controlData.id === e.id) {
          c.select()
        } else {
          c.hide();
        }
      });
    this.hasSelection = true;
  }
}
