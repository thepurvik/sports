import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoRestrictionComponent } from './geo-restriction.component';

describe('GeoRestrictionComponent', () => {
  let component: GeoRestrictionComponent;
  let fixture: ComponentFixture<GeoRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoRestrictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
