import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty({ example: 'Requisitos' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
