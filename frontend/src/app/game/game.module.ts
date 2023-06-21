import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameControlComponent } from './game-control/game-control.component';
import { GameComponent } from './game/game.component';
import { GameControlSwitchComponent } from './game-control-switch/game-control-switch.component';



@NgModule({
  declarations: [
    GameControlComponent,
    GameComponent,
    GameControlSwitchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
