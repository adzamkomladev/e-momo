import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CoreModule } from '@common/modules/core.module';
import { ApiKeyModule } from '@app/api.key/api.key.module';

import { ApiKeyMiddleware } from '@common/middlewares/api.key.middleware';

@Module({
  imports: [CoreModule, ApiKeyModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude('health', 'swagger')
      .forRoutes('*');
  }
}