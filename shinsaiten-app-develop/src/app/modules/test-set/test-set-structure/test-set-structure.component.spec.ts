import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetStructureComponent } from './test-set-structure.component';

describe('TestSetStructureComponent', () => {
  let component: TestSetStructureComponent;
  let fixture: ComponentFixture<TestSetStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
