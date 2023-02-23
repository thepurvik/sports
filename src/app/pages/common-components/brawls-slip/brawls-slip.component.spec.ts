import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlsSlipComponent } from './brawls-slip.component';

describe('BrawlsSlipComponent', () => {
  let component: BrawlsSlipComponent;
  let fixture: ComponentFixture<BrawlsSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrawlsSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrawlsSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
