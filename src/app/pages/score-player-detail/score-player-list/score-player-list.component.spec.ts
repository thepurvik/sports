import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePlayerListComponent } from './score-player-list.component';

describe('ScorePlayerListComponent', () => {
  let component: ScorePlayerListComponent;
  let fixture: ComponentFixture<ScorePlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorePlayerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorePlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
