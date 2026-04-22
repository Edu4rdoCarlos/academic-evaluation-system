import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'LP1' })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  semester: number;
}
