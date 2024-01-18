import { IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class InitiateDto {
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    readonly amount: number;

    @IsNotEmpty()
    @IsString()
    readonly method: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('GH')
    readonly account: string;

    @IsNotEmpty()
    @IsString()
    readonly operator: string;
}