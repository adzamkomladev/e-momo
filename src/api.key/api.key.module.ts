import { Module } from '@nestjs/common';

import { PrismaService } from '@common/services/prisma.service';

import { ApiKeyService } from './api.key.service';
import { ApiKeyController } from './api.key.controller';

@Module({
  controllers: [ApiKeyController],
  providers: [ApiKeyService, PrismaService],
  exports: [ApiKeyService]
})
export class ApiKeyModule { }
