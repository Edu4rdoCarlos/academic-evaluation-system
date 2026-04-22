import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassesService } from '../services/classes.service';
import { HttpResponse } from '@/shared/utils/http-response';
import { CreateClassDto } from '../dto/create-class.dto';
import { UpdateClassDto } from '../dto/update-class.dto';
import { EnrollStudentDto } from '../dto/enroll-student.dto';
import {
  ListClassesApi,
  GetClassApi,
  GetClassWithStudentsApi,
  CreateClassApi,
  UpdateClassApi,
  DeleteClassApi,
  EnrollStudentApi,
  UnenrollStudentApi,
} from '../decorators/classes-api.decorator';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ListClassesApi()
  async listAll(@Query('page') page = '1', @Query('perPage') perPage = '20') {
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
  @GetClassApi()
  async findById(@Param('id') id: string) {
    return HttpResponse.of(await this.classesService.findById(id));
  }

  @Get(':id/students')
  @GetClassWithStudentsApi()
  async findWithStudents(@Param('id') id: string) {
    return HttpResponse.of(await this.classesService.findWithStudents(id));
  }

  @Post()
  @CreateClassApi()
  async create(@Body() data: CreateClassDto) {
    return HttpResponse.of(await this.classesService.create(data));
  }

  @Put(':id')
  @UpdateClassApi()
  async update(@Param('id') id: string, @Body() data: UpdateClassDto) {
    return HttpResponse.of(await this.classesService.update(id, data));
  }

  @Delete(':id')
  @DeleteClassApi()
  async delete(@Param('id') id: string) {
    return HttpResponse.of(await this.classesService.delete(id));
  }

  @Post(':id/enrollments')
  @EnrollStudentApi()
  async enroll(@Param('id') classId: string, @Body() body: EnrollStudentDto) {
    return HttpResponse.of(await this.classesService.enroll(classId, body.studentId));
  }

  @Delete(':id/enrollments/:studentId')
  @UnenrollStudentApi()
  async unenroll(@Param('id') classId: string, @Param('studentId') studentId: string) {
    return HttpResponse.of(await this.classesService.unenroll(classId, studentId));
  }
}
