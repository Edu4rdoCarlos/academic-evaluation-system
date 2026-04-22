import { ApiProperty } from '@nestjs/swagger';

export enum EvaluationConceptDto {
  MANA = 'MANA',
  MPA = 'MPA',
  MA = 'MA',
}

export class UpsertEvaluationDto {
  @ApiProperty({ example: 'uuid-of-class' })
  classId: string;

  @ApiProperty({ example: 'uuid-of-student' })
  studentId: string;

  @ApiProperty({ example: 'uuid-of-goal' })
  goalId: string;

  @ApiProperty({ enum: EvaluationConceptDto, example: EvaluationConceptDto.MA })
  concept: EvaluationConceptDto;
}
