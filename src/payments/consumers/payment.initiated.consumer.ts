import { HttpStatus, Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';
import { Payment } from '@prisma/client';

import { XyzService } from '@ejara/xyz';

import { PAYMENT_INITIATED_QUEUE, } from '../constants/queues.constant';

import { PaymentsService } from '../payments.service';



@Processor(PAYMENT_INITIATED_QUEUE)
export class PaymentInitiatedConsumer {
    private readonly logger = new Logger(PaymentInitiatedConsumer.name);

    constructor(private readonly xyz: XyzService, private readonly paymentsService: PaymentsService) { }

    @Process({ concurrency: 1 })
    async handlePaymentInitiated(job: Job<Payment>) {
        this.logger.log('Start payment initiated...');

        const payment = job.data;

        const res = await this.makePayment(payment);

        await this.updatePayment(payment, res);

        this.logger.log('End payment initiated...');
    }

    private async makePayment(payment: Payment) {
        try {
            return await this.xyz.makePayment({
                ref: payment.ref,
                amount: payment.amount
            });
        } catch (error) {
            this.logger.error('Failed to make payment on xyz', error);
            return null;
        }
    }

    private async updatePayment(payment: Payment, res: any | null) {
        if (res?.statusCode === HttpStatus.OK) {
            await this.paymentsService.updatePayment({
                id: payment.id,
                externalRef: res.data.reference,
                request: {
                    ref: payment.ref,
                    amount: payment.amount
                },
                response: res,
                status: res.data.status
            });

            this.logger.log('Payment Initiated');
            return;
        }

        await this.paymentsService.updatePayment({
            id: payment.id,
            request: {
                ref: payment.ref,
                amount: payment.amount
            },
            response: res,
            status: 'failed'
        });

        this.logger.log('Payment failed!');
    }
}
