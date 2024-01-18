import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { XyzDto } from './dto/xyz.dto';

import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) { }

  @Post('xyz')
  @HttpCode(200)
  @ApiOkResponse()
  async handleXyz(
    @Body() body: XyzDto,
  ) {
    this.logger.log('THIS IS THE DATA RECEIVED FOR HANDLE XYZ WEBHOOK', body);

    this.webhooksService.handlePaymentCompleted(body);

    this.logger.log('XYZ WEBHOOK SUCCESSFUL');

    return 'OK';
  }
}
