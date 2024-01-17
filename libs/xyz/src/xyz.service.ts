import { Injectable } from '@nestjs/common';

import { Status } from './enums/status.enum';

import { Response } from './dto/response.dto';

@Injectable()
export class XyzService {

    async makePayment(): Promise<Response> {
        return {
            statusCode: 200,
            data: {
                status: Status.PENDING,
                amount: 1000,
                reference: "xxxxxx",
                externalReference: "xxxxxxx"
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
