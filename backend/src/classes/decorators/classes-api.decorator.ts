import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { paginationSchema } from '@/shared/swagger/pagination.schema';

const classSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    topic: { type: 'string' },
    year: { type: 'number' },
    semester: { type: 'number' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

const enrollmentSchema = {
  type: 'object' as const,
  properties: {
    id: { type: 'string' },
    classId: { type: 'string' },
    studentId: { type: 'string' },
    enrolledAt: { type: 'string', format: 'date-time' },
  },
};

export const ListClassesApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'List all classes (paginated)' }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'perPage', required: false, example: 20 }),
    ApiOkResponse({
      schema: {
        properties: {
          data: { type: 'array', items: classSchema },
          metadata: paginationSchema,
        },
      },
    }),
  );

export const GetClassApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get class by id' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: classSchema } } }),
  );

export const GetClassWithStudentsApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get class with enrolled students' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            type: 'object',
            properties: {
              ...classSchema.properties,
              enrollments: { type: 'array', items: enrollmentSchema },
            },
          },
        },
      },
    }),
  );

export const CreateClassApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a class' }),
    ApiCreatedResponse({ schema: { properties: { data: classSchema } } }),
  );

export const UpdateClassApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a class' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: classSchema } } }),
  );

export const DeleteClassApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a class' }),
    ApiParam({ name: 'id' }),
    ApiOkResponse({ schema: { properties: { data: classSchema } } }),
  );

export const EnrollStudentApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Enroll a student in a class' }),
    ApiParam({ name: 'id', description: 'Class id' }),
    ApiCreatedResponse({ schema: { properties: { data: enrollmentSchema } } }),
  );

export const UnenrollStudentApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Unenroll a student from a class' }),
    ApiParam({ name: 'id', description: 'Class id' }),
    ApiParam({ name: 'studentId' }),
    ApiOkResponse({ schema: { properties: { data: enrollmentSchema } } }),
  );
