import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePlaylistDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsNumber({}, {each: true})
    readonly songIds: number[];

    @IsNumber()
    @IsNotEmpty()
    readonly user: number;
    
}