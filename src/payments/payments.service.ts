import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@common/services/prisma.service';
import { Payment, Prisma } from '@prisma/client';

@Injectable()
export class PaymentsService {

    constructor(private readonly prisma: PrismaService) { }

    async initiatePayment(payload: any) {
        const payment = await this.prisma.payment.create({
            data: payload
        });

        if (payment) {
            //Create and send job
        }


        return payment;
    }

    async get(ref: string) {
        return await this.prisma.payment.findFirst({
            where: {
                ref
            }
        });
    }

    async getAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PaymentWhereUniqueInput;
        where?: Prisma.PaymentWhereInput;
        orderBy?: Prisma.PaymentOrderByWithRelationInput;
    }): Promise<Payment[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.payment.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }



}
