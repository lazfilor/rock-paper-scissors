import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviewModalComponent } from './game-review-modal.component';

describe('GameReviewModalComponent', () => {
  let component: GameReviewModalComponent;
  let fixture: ComponentFixture<GameReviewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameReviewModalComponent]
    });
    fixture = TestBed.createComponent(GameReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
