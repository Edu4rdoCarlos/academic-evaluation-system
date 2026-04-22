import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentData, UpdateStudentData } from '../repositories/student.repository.interface';
import { HttpResponse } from '@/shared/utils/http-response';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async listAll(
    @Query('page') page = '1',
    @Query('perPage') perPage = '20',
  ) {
    const parsedPage = Number(page);
    const parsedPerPage = Number(perPage);
    const { items, totalItems } = await this.studentsService.listPaginated(parsedPage, parsedPerPage);
    return HttpResponse.paginated(items, {
      page: parsedPage,
      perPage: parsedPerPage,
      totalPage: Math.ceil(totalItems / parsedPerPage),
      totalItems,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return HttpResponse.of(await this.studentsService.findById(id));
  }

  @Post()
  async create(@Body() data: CreateStudentData) {
    return HttpResponse.of(await this.studentsService.create(data));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateStudentData) {
    return HttpResponse.of(await this.studentsService.update(id, data));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return HttpResponse.of(await this.studentsService.delete(id));
  }
}
