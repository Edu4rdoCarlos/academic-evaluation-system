import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiPropertyOptional({ example: 'Alice Silva' })
  name?: string;

  @ApiPropertyOptional({ example: '11111111111' })
  cpf?: string;

  @ApiPropertyOptional({ example: 'alice@example.com' })
  email?: string;
}
