import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

const digestSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    studentId: { type: 'string' },
    digestDate: { type: 'string', format: 'date-time' },
    status: { type: 'string', enum: ['pending', 'sent'] },
    sentAt: { type: 'string', format: 'date-time', nullable: true },
  },
};

export const GetPendingDigestsApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'List pending email digests' }),
    ApiOkResponse({
      schema: { properties: { data: { type: 'array', items: digestSchema } } },
    }),
  );

export const SendDigestApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Mark a digest as sent' }),
    ApiParam({ name: 'id' }),
    ApiCreatedResponse({ schema: { properties: { data: digestSchema } } }),
  );
