import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ClassesService } from '../services/classes.service';
import { CreateClassData, UpdateClassData } from '../repositories/class.repository.interface';
import { HttpResponse } from '@/shared/utils/http-response';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async listAll(
    @Query('page') page = '1',
    @Query('perPage') perPage = '20',
  ) {
    const parsedPage = Number(page);
    const parsedPerPage = Number(perPage);
    const { items, totalItems } = await this.classesService.listPaginated(parsedPage, parsedPerPage);
    return HttpResponse.paginated(items, {
      page: parsedPage,
      perPage: parsedPerPage,
      totalPage: Math.ceil(totalItems / parsedPerPage),
      totalItems,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return HttpResponse.of(await this.classesService.findById(id));
  }

  @Get(':id/students')
  async findWithStudents(@Param('id') id: string) {
    return HttpResponse.of(await this.classesService.findWithStudents(id));
  }

  @Post()
  async create(@Body() data: CreateClassData) {
    return HttpResponse.of(await this.classesService.create(data));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateClassData) {
    return HttpResponse.of(await this.classesService.update(id, data));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return HttpResponse.of(await this.classesService.delete(id));
  }

  @Post(':id/enrollments')
  async enroll(@Param('id') classId: string, @Body('studentId') studentId: string) {
    return HttpResponse.of(await this.classesService.enroll(classId, studentId));
  }

  @Delete(':id/enrollments/:studentId')
  async unenroll(@Param('id') classId: string, @Param('studentId') studentId: string) {
    return HttpResponse.of(await this.classesService.unenroll(classId, studentId));
  }
}
