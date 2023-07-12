import {Component, ViewChild} from '@angular/core';
import {GameControl} from '../../shared/game-control';
import {gameConfiguration} from '../../shared/game-configuration';
import {GameReviewModalComponent} from '../game-review-modal/game-review-modal.component';
import {GameControlComponent} from '../game-control/game-control.component';
import {GameControlSwitchComponent} from '../game-control-switch/game-control-switch.component';
import {ServerMove} from '../../shared/server-move';
import {Router} from '@angular/router';
import {GameResult} from '../../shared/game-result';
import {GameService} from '../game.service';

@Component({
  selector: 'rps-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @ViewChild('review') reviewComponent!: GameReviewModalComponent;

  @ViewChild('serverControl') serverControlComponent!: GameControlComponent;

  @ViewChild('controlSwitch') switchComponent!: GameControlSwitchComponent;

  constructor(private router: Router, private gameService: GameService) {}

  /**
   * Method represents entrypoint for a game round, triggered by the user's control selection
   * @param userMove the control selected by a user
   */
  handleSwitchSelection(userMove: GameControl) {
    this.gameService.getServerMove(userMove.id)
      .subscribe({
        next: response => this.handleServerMove(userMove, response),
        error: err => {
          console.error(err);
          this.router.navigate(['error', 'server']).catch(console.error);
        }
      });
  }

  /**
   * Method handles a game-round termination, triggered by the user, either preparing the game for a new round or leaving to the home-screen
   * @param userWantsRematch a boolean that describes whether the user wants to play a new round or leave for the home-screen
   */
  handleUserRematch(userWantsRematch: boolean) {

    if (userWantsRematch) {
      this.resetGame();
    } else {
      this.router.navigate(['']).catch(console.error);
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

  handleServerMove(userMove: GameControl, serverMove: ServerMove) {
    const serverControl = this.findControlForServerMove(serverMove);

    if (serverControl == null) {
      this.router.navigate(['error', 'default']).catch(console.error);
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

  findControlForServerMove(serverMove: ServerMove): GameControl | null {
    const controlMatch: GameControl[] = gameConfiguration.controls.filter(control => control.id === serverMove.move);
    return controlMatch.length === 1 ? controlMatch[0] : null;
  }
}
