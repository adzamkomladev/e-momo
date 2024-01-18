import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { XYZ_WEBHOOK_RECEIVED } from '../@common/constants/events.constant';

import { XyzWebhookReceivedEvent } from './events/xyz.webhook.received.event';

@Injectable()
export class WebhooksService {

    constructor(private readonly event: EventEmitter2) { }

    handlePaymentCompleted(payload: any) {
        //TODO: Log webhook into a store (for your own good)

        const event = new XyzWebhookReceivedEvent();
        event.amount = payload.amount;
        event.externalRef = payload.externalRef;
        event.ref = payload.ref;
        event.status = payload.status;

        this.event.emit(XYZ_WEBHOOK_RECEIVED, event);
    }
}
