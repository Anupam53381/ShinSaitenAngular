import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterHomeComponent } from './rater-home.component';

describe('RaterHomeComponent', () => {
  let component: RaterHomeComponent;
  let fixture: ComponentFixture<RaterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
