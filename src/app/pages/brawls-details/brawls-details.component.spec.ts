import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlsDetailsComponent } from './brawls-details.component';

describe('BrawlsDetailsComponent', () => {
  let component: BrawlsDetailsComponent;
  let fixture: ComponentFixture<BrawlsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrawlsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrawlsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
