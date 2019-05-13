import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingProjectListComponent } from './rating-project-list.component';

describe('RatingProjectListComponent', () => {
  let component: RatingProjectListComponent;
  let fixture: ComponentFixture<RatingProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
