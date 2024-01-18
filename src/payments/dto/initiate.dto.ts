import { IsIn, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class InitiateDto {
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    readonly amount: number;

    @IsNotEmpty()
    @IsString()
    @IsIn(['momo'])
    readonly method: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('GH')
    readonly account: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['mtn', 'vodafone', 'airteltigo'])
    readonly operator: string;

    @IsNotEmpty()
    @IsString()
    readonly reference: string;
}