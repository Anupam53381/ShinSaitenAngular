import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterEditComponent } from './rater-edit.component';

describe('RaterEditComponent', () => {
  let component: RaterEditComponent;
  let fixture: ComponentFixture<RaterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
