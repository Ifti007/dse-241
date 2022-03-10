import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRatingComponent } from './line-rating.component';

describe('LineRatingComponent', () => {
  let component: LineRatingComponent;
  let fixture: ComponentFixture<LineRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
