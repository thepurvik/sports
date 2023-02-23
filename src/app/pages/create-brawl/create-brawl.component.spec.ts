import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrawlComponent } from './create-brawl.component';

describe('CreateBrawlComponent', () => {
  let component: CreateBrawlComponent;
  let fixture: ComponentFixture<CreateBrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
