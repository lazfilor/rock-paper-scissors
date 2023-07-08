import {Component, EventEmitter, Output} from '@angular/core';
import {GameControl} from '../../shared/game-control';

@Component({
  selector: 'rps-game-review-modal',
  templateUrl: './game-review-modal.component.html',
  styleUrls: ['./game-review-modal.component.scss']
})
export class GameReviewModalComponent {

  @Output() playAgainEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  isVisible: boolean = false;

  playerMove?: GameControl;

  serverMove?: GameControl;

  hasPlayerWon?: boolean;

  /**
   * Calling this method displays a modal including the respective data
   * @param playerMove the user's move's data
   * @param serverMove the server's move's data
   * @param hasPlayerWon whether the user has won or not
   */
  show(playerMove: GameControl, serverMove: GameControl, hasPlayerWon: boolean ) {
    this.playerMove = playerMove;
    this.serverMove = serverMove;
    this.hasPlayerWon = hasPlayerWon;
    this.isVisible = true;
  }

  /**
   * Calling this method will hide the modal as well as remove the obsolete data
   */
  hide() {
    this.isVisible = false;
    this.playerMove = undefined;
    this.serverMove = undefined;
    this.hasPlayerWon = undefined;
  }

  /**
   * Calling this method indicates the user's willingness for a rematch via the playAgainEmitter
   */
  playAgain() {
    this.playAgainEvent.emit(true);
  }

  /**
   * Calling this method indicates that the user wants to return to the starting page via the playAgainEmitter
   */
  backToHome() {
    this.playAgainEvent.emit(false);
  }
}
