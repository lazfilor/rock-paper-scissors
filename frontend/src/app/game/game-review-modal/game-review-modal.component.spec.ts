import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviewModalComponent } from './game-review-modal.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GameReviewModalComponent', () => {
  let component: GameReviewModalComponent;
  let fixture: ComponentFixture<GameReviewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameReviewModalComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(GameReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
