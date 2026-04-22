import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

const conceptEnum = ['MANA', 'MPA', 'MA'];

const evaluationSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    classId: { type: 'string' },
    studentId: { type: 'string' },
    goalId: { type: 'string' },
    concept: { type: 'string', enum: conceptEnum },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

const changeLogSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    evaluationId: { type: 'string' },
    studentId: { type: 'string' },
    classId: { type: 'string' },
    goalId: { type: 'string' },
    oldConcept: { type: 'string', enum: conceptEnum, nullable: true },
    newConcept: { type: 'string', enum: conceptEnum },
    changedAt: { type: 'string', format: 'date-time' },
  },
};

export const GetEvaluationsByClassApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all evaluations for a class' }),
    ApiParam({ name: 'classId' }),
    ApiOkResponse({
      schema: { properties: { data: { type: 'array', items: evaluationSchema } } },
    }),
  );

export const UpsertEvaluationApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create or update an evaluation' }),
    ApiCreatedResponse({
      schema: {
        properties: {
          data: {
            type: 'object',
            properties: {
              evaluation: evaluationSchema,
              changeLog: changeLogSchema,
            },
          },
        },
      },
    }),
  );
