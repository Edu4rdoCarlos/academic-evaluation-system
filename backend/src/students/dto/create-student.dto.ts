import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Alice Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '11111111111' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email: string;
}
