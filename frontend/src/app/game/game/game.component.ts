import {Component, OnInit} from '@angular/core';
import {GameControl} from '../../shared/game-control';
import {gameConfiguration} from '../../shared/game-configuration';

@Component({
  selector: 'rps-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  controls: GameControl[] = [];

  ngOnInit() {
    this.controls = gameConfiguration.controls;
  }
}
