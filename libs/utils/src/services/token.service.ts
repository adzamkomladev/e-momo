import { Injectable } from '@nestjs/common';

import { customAlphabet } from 'nanoid';



@Injectable()
export class TokenService {
    generatePaymentRef(length: number = 16, prefix: string = '') {
        const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length)
        return prefix + nanoid();
    }
}
