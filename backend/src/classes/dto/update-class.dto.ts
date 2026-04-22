import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateClassDto {
  @ApiPropertyOptional({ example: 'LP1' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  topic?: string;

  @ApiPropertyOptional({ example: 2024 })
  @IsInt()
  @Min(1900)
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  semester?: number;
}
