import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
    @IsString()
    @ApiProperty()
    title: string;
    
    @IsString()
    @ApiProperty()
    content: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    writer?: string;
}
