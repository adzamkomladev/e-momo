import { Payment } from "@prisma/client";

export class PaginatedPayments {
    readonly total: number;
    readonly page: number;
    readonly size: number;
    readonly data: Partial<Payment>[];
}