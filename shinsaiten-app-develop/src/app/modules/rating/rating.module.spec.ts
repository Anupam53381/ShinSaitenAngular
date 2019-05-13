import { RatingModule } from './rating.module';

describe('RatingModule', () => {
  let ratingModule: RatingModule;

  beforeEach(() => {
    ratingModule = new RatingModule();
  });

  it('should create an instance', () => {
    expect(ratingModule).toBeTruthy();
  });
});
