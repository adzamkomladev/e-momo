import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { OnEvent } from '@nestjs/event-emitter';

import { Queue } from 'bull';

import { XYZ_WEBHOOK_RECEIVED } from '@common/constants/events.constant';
import { COMPLETE_PAYMENT_QUEUE } from '../constants/queues.constant';

import { XyzWebhookReceivedEvent } from '@app/webhooks/events/xyz.webhook.received.event';


@Injectable()
export class XyzWebhookReceivedListener {
    private readonly logger = new Logger(XyzWebhookReceivedListener.name);

    constructor(
        @InjectQueue(COMPLETE_PAYMENT_QUEUE)
        private completePaymentQueue: Queue,
    ) { }

    @OnEvent(XYZ_WEBHOOK_RECEIVED, { async: true })
    async handleXyzWebhookReceivedEvent(event: XyzWebhookReceivedEvent) {
        this.logger.log('EVENT RECEIVED DATA', { ...event })
        await this.completePaymentQueue.add(event);
    }
}
