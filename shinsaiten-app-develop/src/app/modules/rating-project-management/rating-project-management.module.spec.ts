import { RatingProjectManagementModule } from './rating-project-management.module';

describe('RatingProjectManagementModule', () => {
  let ratingProjectManagementModule: RatingProjectManagementModule;

  beforeEach(() => {
      ratingProjectManagementModule = new RatingProjectManagementModule();
  });

  it('should create an instance', () => {
    expect(ratingProjectManagementModule).toBeTruthy();
  });
});
