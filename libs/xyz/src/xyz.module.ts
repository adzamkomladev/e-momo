import { Module } from '@nestjs/common';

import { UtilsModule } from '@ejara/utils';

import { XyzService } from './xyz.service';

@Module({
  imports: [UtilsModule],
  providers: [XyzService],
  exports: [XyzService],
})
export class XyzModule { }
