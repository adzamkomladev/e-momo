import { BadRequestException, Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
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
      const payment = await this.paymentsService.initiatePayment(body, apiKey);

      return {
        status: payment.status,
        amount: payment.amount,
        reference: payment.ref,
        externalReference: payment.externalRef
      }
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get('status/:ref')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ResponseMessage('payment status retrieved')
  async status(
    @ApiKey() apiKey: ApiKeyEntity,
    @Param('ref') ref: string
  ) {
    try {
      const payment = await this.paymentsService.get(ref, apiKey);

      return {
        status: payment.status,
        amount: payment.amount,
        reference: payment.ref,
        externalReference: payment.externalRef
      }
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get('history')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ResponseMessage('payments retrieved')
  async history(
    @ApiKey() apiKey: ApiKeyEntity,
    @Param('ref') ref: string
  ) {
    try {
      const payment = await this.paymentsService.get(ref, apiKey);

      return {
        status: payment.status,
        amount: payment.amount,
        reference: payment.ref,
        externalReference: payment.externalRef
      }
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }
}
