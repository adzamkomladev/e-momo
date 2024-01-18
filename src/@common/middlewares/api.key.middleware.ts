import { Injectable, Logger, NestMiddleware } from '@nestjs/common';


import { ApiKeyService } from '@app/api.key/api.key.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ApiKeyMiddleware.name);

  constructor(private apiKeyService: ApiKeyService) { }

  async use(req: any, res: any, next: () => void) {
    try {
      const key = req.headers['x-api-key'] as string;
      const apiKey = await this.apiKeyService.get(key);

      if (apiKey) {
        req.user = apiKey.user;
      }
    } catch (error) {
      this.logger.error(error);
    }

    next();
  }
}
