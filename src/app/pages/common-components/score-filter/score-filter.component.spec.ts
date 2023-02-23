import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreFilterComponent } from './score-filter.component';

describe('ScoreFilterComponent', () => {
  let component: ScoreFilterComponent;
  let fixture: ComponentFixture<ScoreFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
