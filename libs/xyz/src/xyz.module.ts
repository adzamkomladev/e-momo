import { Module } from '@nestjs/common';
import { XyzService } from './xyz.service';

@Module({
  providers: [XyzService],
  exports: [XyzService],
})
export class XyzModule {}
