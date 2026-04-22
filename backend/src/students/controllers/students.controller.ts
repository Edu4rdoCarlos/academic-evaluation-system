import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentData, UpdateStudentData } from '../repositories/student.repository.interface';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  listAll() {
    return this.studentsService.listAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Post()
  create(@Body() data: CreateStudentData) {
    return this.studentsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateStudentData) {
    return this.studentsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}
