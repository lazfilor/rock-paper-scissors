import {Component, ViewChild} from '@angular/core';
import {GameControl} from '../../shared/game-control';
import {gameConfiguration} from '../../shared/game-configuration';
import {GameReviewModalComponent} from '../game-review-modal/game-review-modal.component';
import {GameControlComponent} from '../game-control/game-control.component';
import {GameControlSwitchComponent} from '../game-control-switch/game-control-switch.component';
import {ServerMove} from '../../shared/server-move';
import {Router} from '@angular/router';
import {GameResult} from '../../shared/game-result';
import {MoveId} from '../../shared/move-id';

@Component({
  selector: 'rps-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @ViewChild('review') reviewComponent!: GameReviewModalComponent;

  @ViewChild('serverControl') serverControlComponent!: GameControlComponent;

  @ViewChild('controlSwitch') switchComponent!: GameControlSwitchComponent;

  constructor(private router: Router ) {}

  /**
   * Method represents entrypoint for a game round, triggered by the user's control selection
   * @param userMove the control selected by a user
   */
  handleSwitchSelection(userMove: GameControl) {
    const serverMove = this.getServerMove(userMove);
    const serverControl = this.findControlForServerMove(serverMove);

    if (serverControl == null) {
      //@TODO: Error page
      return;
    }
    this.serverControlComponent.reveal(serverControl);

    if (serverMove.result === GameResult.TIE) {
      this.resetGame();
    } else {
      setTimeout(() => {
        this.reviewComponent.show(userMove, serverControl, serverMove.result === GameResult.WIN);
      }, 1000);
    }
  }

  /**
   * Method handles a game-round termination, triggered by the user, either preparing the game for a new round or leaving to the home-screen
   * @param userWantsRematch a boolean that describes whether the user wants to play a new round or leave for the home-screen
   */
  handleUserRematch(userWantsRematch: boolean) {

    if (userWantsRematch) {
      this.resetGame();
    } else {
      this.router.navigate(['']);
    }
  }

  /**
   * Calling this method will reset all subcomponents of the game and prepare them for new user input
   */
  resetGame() {
    this.reviewComponent.hide();
    setTimeout(() => {
      this.serverControlComponent.hide();
      this.switchComponent.reset();
    }, 500);
  }

  //@TODO: Move into service
  getServerMove(userMove: GameControl): ServerMove {
    //@TODO: Fetch data from server, incl. error
    //@TODO: Enable ties => On tie immediately reset game
    return {
      moveId: MoveId.SCISSORS,
      result: (function (): GameResult {

        switch (userMove.id) {
          case 'scissors':
            return GameResult.TIE;
          case 'rock':
            return GameResult.WIN;
          case 'paper':
            return GameResult.LOSS;
          default:
            return GameResult.LOSS;
        }
      })()
    };
  }

  //@TODO: Move into service
  findControlForServerMove(serverMove: ServerMove): GameControl | null {
    const controlMatch: GameControl[] = gameConfiguration.controls.filter(control => control.id === serverMove.moveId);
    return controlMatch.length === 1 ? controlMatch[0] : null;
  }
}
