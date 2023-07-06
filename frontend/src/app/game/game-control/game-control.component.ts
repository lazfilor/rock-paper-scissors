import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameControl} from '../../shared/game-control';

@Component({
  selector: 'rps-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit{

  @Input()
  controlData: GameControl = {id: 'hidden', name: 'Hidden', assetPath: ''};

  @Input()
  isSelected = false;

  @Output() controlSelectEvent = new EventEmitter<GameControl>();

  isRevealed: boolean = false;

  ngOnInit(): void {

    if (this.controlData?.assetPath) {
      this.isRevealed = true;
    }
  }


  /**
   * Reveals control to the user, may also add new data in case it did not exist before
   * @param [data] the new data that should be revealed
   */
  reveal(data?: GameControl) {

    if (data) {
      this.controlData = data;
    }
    this.isRevealed = true;
  }

  /**
   * Hides control from the user and unselects it
   */
  hide() {
    this.isRevealed = false;
    this.isSelected = false;
  }

  /**
   * Sends click event to parents only in case it has available data to provide
   */
  clickControl() {

    if (this.isRevealed && this.controlData) {
      this.controlSelectEvent.emit(this.controlData);
    }
  }

  /**
   * Unselects control without hiding it
   */
  unselect() {
    this.isSelected = false;
  }

  /**
   * Selects control
   */
  select() {
    this.isSelected = true;
  }
}
