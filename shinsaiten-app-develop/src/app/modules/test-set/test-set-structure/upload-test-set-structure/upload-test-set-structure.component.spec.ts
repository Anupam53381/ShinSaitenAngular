import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTestSetStructureComponent } from './upload-test-set-structure.component';

describe('UploadTestSetStructureComponent', () => {
  let component: UploadTestSetStructureComponent;
  let fixture: ComponentFixture<UploadTestSetStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTestSetStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTestSetStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
