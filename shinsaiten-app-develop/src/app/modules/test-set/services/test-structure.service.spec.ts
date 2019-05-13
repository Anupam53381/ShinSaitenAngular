import { TestBed, inject } from '@angular/core/testing';

import { TestStructureService } from './test-structure.service';

describe('TestStructureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestStructureService]
    });
  });

  it('should be created', inject([TestStructureService], (service: TestStructureService) => {
    expect(service).toBeTruthy();
  }));
});
