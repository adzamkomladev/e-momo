import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class InitiateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    readonly amount: number;

    @ApiProperty({ enum: ['momo'] })
    @IsNotEmpty()
    @IsString()
    @IsIn(['momo'])
    readonly method: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('GH')
    readonly account: string;

    @ApiProperty({ enum: ['mtn', 'vodafone', 'airteltigo'] })
    @IsNotEmpty()
    @IsString()
    @IsIn(['mtn', 'vodafone', 'airteltigo'])
    readonly operator: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly reference: string;
}