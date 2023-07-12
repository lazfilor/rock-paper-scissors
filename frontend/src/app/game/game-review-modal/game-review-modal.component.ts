import {Component, EventEmitter, Output} from '@angular/core';
import {GameControl} from '../../shared/game-control';
import {catchError, Observable, of} from 'rxjs';
import {GameService} from '../game.service';
import {Router} from '@angular/router';

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

  reviewText$?: Observable<string>;

  constructor(private gameService: GameService, private router: Router) {
  }

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
    this.reviewText$ = this.gameService.getReview(playerMove.id, serverMove.id).pipe(
      catchError(err => {
        console.error("Unable to retrieve review", err);
        return of();
      })
    );
  }

  /**
   * Calling this method will hide the modal as well as remove the obsolete data
   */
  hide() {
    this.isVisible = false;
    this.playerMove = undefined;
    this.serverMove = undefined;
    this.hasPlayerWon = undefined;
    this.reviewText$ = undefined;
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
