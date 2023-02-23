import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPalyAccordionComponent } from './how-to-paly-accordion.component';

describe('HowToPalyAccordionComponent', () => {
  let component: HowToPalyAccordionComponent;
  let fixture: ComponentFixture<HowToPalyAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToPalyAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToPalyAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
