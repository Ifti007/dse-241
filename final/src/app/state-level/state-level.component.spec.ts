import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLevelComponent } from './state-level.component';

describe('StateLevelComponent', () => {
  let component: StateLevelComponent;
  let fixture: ComponentFixture<StateLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
