import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestSetComponent } from './add-test-set.component';

describe('AddTestSetComponent', () => {
  let component: AddTestSetComponent;
  let fixture: ComponentFixture<AddTestSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
