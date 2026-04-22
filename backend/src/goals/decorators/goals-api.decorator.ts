import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

const goalSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
  },
};

export const ListGoalsApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'List all goals' }),
    ApiOkResponse({ schema: { properties: { data: { type: 'array', items: goalSchema } } } }),
  );

export const CreateGoalApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a goal' }),
    ApiCreatedResponse({ schema: { properties: { data: goalSchema } } }),
  );

export const DeleteGoalApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a goal' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: goalSchema } } }),
  );
