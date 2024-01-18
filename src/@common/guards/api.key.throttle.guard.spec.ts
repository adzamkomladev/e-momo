import { ApiKeyThrottleGuard } from './api.key.throttle.guard';

describe('ApiKeyThrottleGuard', () => {
  it('should be defined', () => {
    expect(new ApiKeyThrottleGuard()).toBeDefined();
  });
});
