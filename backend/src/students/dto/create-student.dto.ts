import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'Alice Silva' })
  name: string;

  @ApiProperty({ example: '11111111111' })
  cpf: string;

  @ApiProperty({ example: 'alice@example.com' })
  email: string;
}
