import { Module } from '@nestjs/common';
import { PhoneService, TokenService } from './services';

@Module({
  providers: [TokenService, PhoneService],
  exports: [TokenService, PhoneService],
})
export class UtilsModule { }
