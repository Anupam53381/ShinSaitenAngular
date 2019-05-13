import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterAdminHomeComponent } from './rater-admin-home.component';

describe('RaterAdminHomeComponent', () => {
  let component: RaterAdminHomeComponent;
  let fixture: ComponentFixture<RaterAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
