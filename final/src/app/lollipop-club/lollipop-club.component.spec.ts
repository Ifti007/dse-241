import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LollipopClubComponent } from './lollipop-club.component';

describe('LollipopClubComponent', () => {
  let component: LollipopClubComponent;
  let fixture: ComponentFixture<LollipopClubComponent>;   

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LollipopClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LollipopClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});  //
