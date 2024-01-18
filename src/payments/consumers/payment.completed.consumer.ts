import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';

import { COMPLETE_PAYMENT_QUEUE } from '../constants/queues.constant';

import { XyzWebhookReceivedEvent } from '@app/webhooks/events/xyz.webhook.received.event';

import { PaymentsService } from '../payments.service';



@Processor(COMPLETE_PAYMENT_QUEUE)
export class CompletePaymentConsumer {
    private readonly logger = new Logger(CompletePaymentConsumer.name);

    constructor(private readonly paymentsService: PaymentsService) { }

    @Process()
    async handleCompletePayment(job: Job<XyzWebhookReceivedEvent>) {
        this.logger.log('Complete payment initiated...');

        const { amount, ref, externalRef, status } = job.data;

        const payment = await this.paymentsService.completePayment({
            amount,
            ref,
            externalRef,
            status
        });

        if (!payment) {
            this.logger.log('Complete payment failed...');
            return;
        }

        this.logger.log('Complete payment completed...');
    }
}
