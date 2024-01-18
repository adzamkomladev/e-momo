export class UpdateDto {
    readonly id: string;
    readonly externalRef?: string;
    readonly status: string;
    readonly request: any;
    readonly response: any;
}