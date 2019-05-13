import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetStructureFilePreviewComponent } from './test-set-structure-file-preview.component';

describe('TestSetStructureFilePreviewComponent', () => {
  let component: TestSetStructureFilePreviewComponent;
  let fixture: ComponentFixture<TestSetStructureFilePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetStructureFilePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetStructureFilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
