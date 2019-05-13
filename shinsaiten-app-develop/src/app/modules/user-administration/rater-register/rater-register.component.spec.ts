import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterRegisterComponent } from './rater-register.component';

describe('RaterRegisterComponent', () => {
  let component: RaterRegisterComponent;
  let fixture: ComponentFixture<RaterRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
