import { TestSetModule } from './test-set.module';

describe('TestSetModule', () => {
  let testSetModule: TestSetModule;

  beforeEach(() => {
    testSetModule = new TestSetModule();
  });

  it('should create an instance', () => {
    expect(testSetModule).toBeTruthy();
  });
});
