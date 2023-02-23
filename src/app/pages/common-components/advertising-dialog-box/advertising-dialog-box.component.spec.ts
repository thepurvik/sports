import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingDialogBoxComponent } from './advertising-dialog-box.component';

describe('AdvertisingDialogBoxComponent', () => {
  let component: AdvertisingDialogBoxComponent;
  let fixture: ComponentFixture<AdvertisingDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
