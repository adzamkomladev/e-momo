import { ApiProperty } from "@nestjs/swagger";

export class XyzDto {
    @ApiProperty()
    readonly amount: number;

    @ApiProperty()
    readonly externalRef: string;

    @ApiProperty()
    readonly ref: string;

    @ApiProperty({ enum: ['failed', 'pending', 'success'] })
    readonly status: string;
}