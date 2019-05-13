import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTestsetComponent } from './upload-testset.component';

describe('UploadTestsetComponent', () => {
  let component: UploadTestsetComponent;
  let fixture: ComponentFixture<UploadTestsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTestsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTestsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
