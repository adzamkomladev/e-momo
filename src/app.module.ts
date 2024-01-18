import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CoreModule } from '@common/modules/core.module';
import { ApiKeyModule } from '@app/api.key/api.key.module';

import { ApiKeyMiddleware } from '@common/middlewares/api.key.middleware';
import { PaymentsModule } from './payments/payments.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [CoreModule, ApiKeyModule, PaymentsModule, WebhooksModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude('health', 'swagger')
      .forRoutes('*');
  }
}