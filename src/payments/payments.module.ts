import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';

import { UtilsModule } from '@ejara/utils';
import { XyzModule } from '@ejara/xyz';

import { COMPLETE_PAYMENT_QUEUE, PAYMENT_INITIATED_QUEUE } from './constants/queues.constant';

import { PrismaService } from '@common/services/prisma.service';
import { PaymentsService } from './payments.service';

import { XyzWebhookReceivedListener } from './listeners/xyz.webhook.received.listener';

import { PaymentInitiatedConsumer } from './consumers/payment.initiated.consumer';
import { CompletePaymentConsumer } from './consumers/payment.completed.consumer';

import { PaymentsController } from './payments.controller';



@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_INITIATED_QUEUE,
    }),
    BullModule.registerQueue({
      name: COMPLETE_PAYMENT_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: PAYMENT_INITIATED_QUEUE,
      adapter: BullAdapter,
    }),
    BullBoardModule.forFeature({
      name: COMPLETE_PAYMENT_QUEUE,
      adapter: BullAdapter,
    }),
    UtilsModule,
    XyzModule
  ],
  controllers: [PaymentsController],
  providers: [PrismaService, PaymentsService, PaymentInitiatedConsumer, XyzWebhookReceivedListener, CompletePaymentConsumer],
})
export class PaymentsModule { }
