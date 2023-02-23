import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseSliderComponent } from './advertise-slider.component';

describe('AdvertiseSliderComponent', () => {
  let component: AdvertiseSliderComponent;
  let fixture: ComponentFixture<AdvertiseSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
