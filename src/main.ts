import { Logger, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { ExceptionsFilter } from '@common/filters/exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });
  // app.setGlobalPrefix('api', { exclude: ['health', 'queues'] });

  const config = app.get(ConfigService);


  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ejara MOMO Payment Processor API')
    .setDescription(
      'The Ejara MOMO Payment Processor API with endpoints to be used by clients',
    )
    .setVersion('1.0')
    .addTag('ejara')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  const port = config.get<number>('app.port');
  await app.listen(port);

  Logger.log(
    `${config.get('app.name')} is running on ${config.get('app.url')}`,
  );
}
bootstrap();
