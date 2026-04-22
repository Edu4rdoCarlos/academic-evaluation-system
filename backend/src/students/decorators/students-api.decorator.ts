import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { paginationSchema } from '@/shared/swagger/pagination.schema';

const studentSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    cpf: { type: 'string' },
    email: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

export const ListStudentsApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'List all students (paginated)' }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'perPage', required: false, example: 20 }),
    ApiOkResponse({
      schema: {
        properties: {
          data: { type: 'array', items: studentSchema },
          metadata: paginationSchema,
        },
      },
    }),
  );

export const GetStudentApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get student by id' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: studentSchema } } }),
  );

export const CreateStudentApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a student' }),
    ApiCreatedResponse({ schema: { properties: { data: studentSchema } } }),
  );

export const UpdateStudentApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a student' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: studentSchema } } }),
  );

export const DeleteStudentApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a student' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: studentSchema } } }),
  );
