import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFilterComponent } from './league-filter.component';

describe('LeagueFilterComponent', () => {
  let component: LeagueFilterComponent;
  let fixture: ComponentFixture<LeagueFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
