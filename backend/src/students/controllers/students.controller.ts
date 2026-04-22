import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentsService } from '../services/students.service';
import { HttpResponse } from '@/shared/utils/http-response';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import {
  ListStudentsApi,
  GetStudentApi,
  CreateStudentApi,
  UpdateStudentApi,
  DeleteStudentApi,
} from '../decorators/students-api.decorator';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ListStudentsApi()
  async listAll(@Query('page') page = '1', @Query('perPage') perPage = '20') {
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
  @GetStudentApi()
  async findById(@Param('id') id: string) {
    return HttpResponse.of(await this.studentsService.findById(id));
  }

  @Post()
  @CreateStudentApi()
  async create(@Body() data: CreateStudentDto) {
    return HttpResponse.of(await this.studentsService.create(data));
  }

  @Put(':id')
  @UpdateStudentApi()
  async update(@Param('id') id: string, @Body() data: UpdateStudentDto) {
    return HttpResponse.of(await this.studentsService.update(id, data));
  }

  @Delete(':id')
  @DeleteStudentApi()
  async delete(@Param('id') id: string) {
    return HttpResponse.of(await this.studentsService.delete(id));
  }
}
