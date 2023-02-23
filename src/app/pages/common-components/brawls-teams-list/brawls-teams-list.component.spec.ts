import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlsTeamsListComponent } from './brawls-teams-list.component';

describe('BrawlsTeamsListComponent', () => {
  let component: BrawlsTeamsListComponent;
  let fixture: ComponentFixture<BrawlsTeamsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrawlsTeamsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrawlsTeamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
