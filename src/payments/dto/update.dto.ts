export class UpdateDto {
    readonly id: string;
    readonly externalRef?: string;
    readonly ref?: string;
    readonly amount?: number;
    readonly status: string;
    readonly request: any;
    readonly response: any;
}