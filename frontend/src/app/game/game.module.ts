import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { GameControlComponent } from './game-control/game-control.component';
import { GameComponent } from './game/game.component';
import { GameControlSwitchComponent } from './game-control-switch/game-control-switch.component';
import {GameRoutingModule} from './game-routing.module';
import { GameReviewModalComponent } from './game-review-modal/game-review-modal.component';



@NgModule({
  declarations: [
    GameControlComponent,
    GameComponent,
    GameControlSwitchComponent,
    GameReviewModalComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgOptimizedImage
  ]
})
export class GameModule { }
