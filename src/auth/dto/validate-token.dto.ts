import { IsNotEmpty, IsString } from "class-validator";

export class VerifyTokenDTO {
    @IsNotEmpty()
    @IsString()
    token: string;
}