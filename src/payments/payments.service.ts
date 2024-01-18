import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { PhoneService, TokenService } from '@ejara/utils';

import { $Enums, Payment, Prisma } from '@prisma/client';
import { Queue } from 'bull';

import { PAYMENT_INITIATED_QUEUE } from './constants/queues.constant';

import { ApiKey } from '../api.key/types/api.key.type';

import { InitiateDto } from './dto/initiate.dto';
import { UpdateDto } from './dto/update.dto';

import { PrismaService } from '@common/services/prisma.service';
import { PaginatedPayments } from './dto/paginated.payments.dto';


@Injectable()
export class PaymentsService {

    constructor(
        @InjectQueue(PAYMENT_INITIATED_QUEUE)
        private paymentInitiatedQueue: Queue,
        private readonly prisma: PrismaService,
        private readonly phoneService: PhoneService,
        private readonly tokenService: TokenService
    ) { }

    async initiatePayment(payload: InitiateDto, apiKey: ApiKey) {
        const { account, amount, method, operator } = payload;

        const payment = await this.prisma.payment.create({
            data: {
                account: this.phoneService.format(account, 'GH'),
                amount,
                method: method as $Enums.PaymentMethod,
                operator: operator as $Enums.PaymentOperator,
                apiKeyId: apiKey.id,
                user: {
                    connect: { id: apiKey.userId }
                },
                ref: this.tokenService.generatePaymentRef(16)
            }
        });

        if (!payment) {
            throw new BadRequestException('Failed to initiate payment!');
        }

        await this.paymentInitiatedQueue.add(payment);

        return payment;
    }

    async get(ref: string, apiKey: ApiKey) {
        const payment = await this.prisma.payment.findFirst({
            where: {
                ref,
                userId: apiKey.userId
            }
        });

        if (!payment) {
            throw new NotFoundException(`Payment with ref: ${ref} not found!`);
        }

        return payment;
    }

    async getAllPaginated(
        apiKey: ApiKey,
        page: number = 1,
        size: number = 10
    ): Promise<PaginatedPayments> {
        const [total, data] = await Promise.all([
            this.prisma.payment.count({
                where: {
                    userId: apiKey.userId
                }
            }),
            , this.prisma.payment.findMany({
                skip: (page - 1) * size,
                take: size,
                where: {
                    userId: apiKey.userId
                }
            })
        ]);

        return {
            page,
            size,
            total,
            data
        }
    }

    async updatePayment({ id, externalRef, request, response, status }: UpdateDto) {
        return await this.prisma.payment.update({
            where: {
                id
            },
            data: {
                externalRef,
                status: status as $Enums.PaymentStatus,
                request,
                response
            }
        })
    }



}
