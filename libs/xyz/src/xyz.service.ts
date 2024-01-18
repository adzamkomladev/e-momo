import { Injectable } from '@nestjs/common';

import { Status } from './enums/status.enum';

import { Response } from './dto/response.dto';
import { TokenService } from '../../utils/src';

@Injectable()
export class XyzService {

    constructor(private readonly tokenService: TokenService) { }

    async makePayment(data: any): Promise<Response> {
        return {
            statusCode: 200,
            data: {
                status: Status.PENDING,
                amount: data.amount,
                reference: data.ref,
                externalReference: this.tokenService.generatePaymentRef(16, 'XYZ')
            }
        }
    }

    async checkStatus(reference: string): Promise<Response> {
        return {
            statusCode: 200,
            data: {
                status: Status.SUCCESS,
                amount: 1000,
                reference: "xxxxxx",
                externalReference: reference
            }
        }
    }
}
