import {Component, OnInit, ViewChild} from '@angular/core';
import {GameControl} from '../../shared/game-control';
import {gameConfiguration} from '../../shared/game-configuration';
import {GameReviewModalComponent} from '../game-review-modal/game-review-modal.component';

@Component({
  selector: 'rps-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  controls: GameControl[] = [];

  @ViewChild('review') reviewComponent!: GameReviewModalComponent;

  ngOnInit() {
    this.controls = gameConfiguration.controls;
  }
}
