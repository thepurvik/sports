import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybrawlsComponent } from './my-brawls.component';

describe('MybrawlsComponent', () => {
  let component: MybrawlsComponent;
  let fixture: ComponentFixture<MybrawlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybrawlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MybrawlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
