import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameControlSwitchComponent } from './game-control-switch.component';
import {GameModule} from '../game.module';

describe('GameControlSwitchComponent', () => {
  let component: GameControlSwitchComponent;
  let fixture: ComponentFixture<GameControlSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameControlSwitchComponent],
      imports: [GameModule]
    });
    fixture = TestBed.createComponent(GameControlSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
