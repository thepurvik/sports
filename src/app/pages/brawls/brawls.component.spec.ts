import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlsComponent } from './brawls.component';

describe('BrawlsComponent', () => {
  let component: BrawlsComponent;
  let fixture: ComponentFixture<BrawlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrawlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrawlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
