import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongsDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, {each: true})
    artists: number[];

    @IsString()
    @IsNotEmpty()
    album: string;

    @IsDateString()
    @IsNotEmpty()
    releaseDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    duration: number;  

    @IsString()
    @IsOptional()
    lyrics: string;
}