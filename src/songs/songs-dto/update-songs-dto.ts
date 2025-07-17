import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongsDTO {

    @IsString()
    @IsOptional()
    title: string;

    @IsArray()
    @IsOptional()
    @IsNumber({}, {each: true})
    artists: number[];

    @IsString()
    @IsOptional()
    album: string;

    @IsDateString()
    @IsOptional()
    releaseDate: Date;

    @IsMilitaryTime()
    @IsOptional()
    duration: number;  

    @IsString()
    @IsOptional()
    lyrics: string;
}