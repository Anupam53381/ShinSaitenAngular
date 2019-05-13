import { GridModule } from './grid-module.module';

describe('GridModuleModule', () => {
  let gridModuleModule: GridModule;

  beforeEach(() => {
    gridModuleModule = new GridModule();
  });

  it('should create an instance', () => {
    expect(gridModuleModule).toBeTruthy();
  });
});
