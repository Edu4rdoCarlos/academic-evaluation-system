import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';

export enum EvaluationConceptDto {
  MANA = 'MANA',
  MPA = 'MPA',
  MA = 'MA',
}

export class UpsertEvaluationDto {
  @ApiProperty({ example: 'uuid-of-class' })
  @IsUUID()
  classId: string;

  @ApiProperty({ example: 'uuid-of-student' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ example: 'uuid-of-goal' })
  @IsUUID()
  goalId: string;

  @ApiProperty({ enum: EvaluationConceptDto, example: EvaluationConceptDto.MA })
  @IsEnum(EvaluationConceptDto)
  concept: EvaluationConceptDto;
}
