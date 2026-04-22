import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @ApiPropertyOptional({ example: 'Alice Silva' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '11111111111' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cpf?: string;

  @ApiPropertyOptional({ example: 'alice@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;
}
