import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ApiKeyThrottleGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.headers['x-api-key'].length ? req.headers['x-api-key'][0] : req.headers['x-api-key']; // individualize IP extraction to meet your own needs
  }
}