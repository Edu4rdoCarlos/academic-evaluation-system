import { ApiProperty } from '@nestjs/swagger';

export class EnrollStudentDto {
  @ApiProperty({ example: 'uuid-of-student' })
  studentId: string;
}
