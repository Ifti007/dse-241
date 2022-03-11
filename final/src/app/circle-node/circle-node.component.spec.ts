import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleNodeComponent } from './circle-node.component';

describe('CircleNodeComponent', () => {
  let component: CircleNodeComponent;
  let fixture: ComponentFixture<CircleNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
