import { Status } from "../enums/status.enum";

export class Response {
    readonly statusCode: number;
    readonly data: Data;
}

export class Data {
    readonly status: Status;
    readonly amount: number;
    readonly reference: string;
    readonly externalReference: string
}