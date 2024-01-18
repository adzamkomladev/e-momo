import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) { }

  @Post('xyz')
  @ApiOkResponse()
  async handleXyz(
    @Body() body: any,
  ) {
    this.logger.log('THIS IS THE DATA RECEIVED FOR HANDLE XYZ WEBHOOK', body);

    this.webhooksService.handlePaymentCompleted(body);

    this.logger.log('XYZ WEBHOOK SUCCESSFUL');

    return 'OK';
  }
}
