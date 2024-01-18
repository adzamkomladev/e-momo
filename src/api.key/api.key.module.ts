import { Module } from '@nestjs/common';

import { PrismaService } from '@common/services/prisma.service';

import { ApiKeyService } from './api.key.service';

@Module({
  providers: [ApiKeyService, PrismaService],
  exports: [ApiKeyService]
})
export class ApiKeyModule { }
