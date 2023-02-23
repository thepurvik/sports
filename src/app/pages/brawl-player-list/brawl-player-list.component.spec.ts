import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlPlayerListComponent } from './brawl-player-list.component';

describe('BrawlPlayerListComponent', () => {
  let component: BrawlPlayerListComponent;
  let fixture: ComponentFixture<BrawlPlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrawlPlayerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrawlPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
