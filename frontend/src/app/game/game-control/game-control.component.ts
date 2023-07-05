import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameControl} from '../../shared/game-control';

@Component({
  selector: 'rps-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit{

  @Input()
  controlData?: GameControl;

  @Output() controlSelectEvent = new EventEmitter<GameControl>();

  isRevealed: boolean = false;

  ngOnInit(): void {

    if (this.controlData) {
      this.isRevealed = true;
    }
  }


  /**
   * Reveals new data to the user in case none had existed before
   * @param data the new data that should be revealed
   */
  reveal(data: GameControl) {

    if (this.isRevealed || !data) {
      return;
    }
    this.controlData = data;
    this.isRevealed = true;
  }

  /**
   * Hides current data from the user
   */
  hide() {

    if (!this.isRevealed) {
      return;
    }
    this.isRevealed = false;
  }

  selectControl() {

    if (this.isRevealed && this.controlData) {
      this.controlSelectEvent.emit(this.controlData);
    }
  }
}
