import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldVizComponent } from './world-viz.component';

describe('WorldVizComponent', () => {
  let component: WorldVizComponent;
  let fixture: ComponentFixture<WorldVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
