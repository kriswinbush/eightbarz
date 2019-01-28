import { LooperModule } from './looper.module';

describe('LooperModule', () => {
  let looperModule: LooperModule;

  beforeEach(() => {
    looperModule = new LooperModule();
  });

  it('should create an instance', () => {
    expect(looperModule).toBeTruthy();
  });
});
