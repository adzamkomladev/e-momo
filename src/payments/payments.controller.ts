import { BadRequestException, Body, Controller, HttpException, Post } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseMessage } from '../@common/decorators/response.message.decorator';
import { InitiateDto } from './dto/initiate.dto';
import { ApiKey } from '../@common/decorators/api.key.decorator';
import { ApiKey as ApiKeyEntity } from '../api.key/types/api.key.type';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('initiate')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ResponseMessage('payment initiated')
  async initiatePayment(
    @ApiKey() apiKey: ApiKeyEntity,
    @Body() body: InitiateDto,
  ) {
    try {
      return await this.paymentsService.initiatePayment(body, apiKey);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }
}
