import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClassesService } from '../services/classes.service';
import { CreateClassData, UpdateClassData } from '../repositories/class.repository.interface';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  listAll() {
    return this.classesService.listAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.classesService.findById(id);
  }

  @Get(':id/students')
  findWithStudents(@Param('id') id: string) {
    return this.classesService.findWithStudents(id);
  }

  @Post()
  create(@Body() data: CreateClassData) {
    return this.classesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateClassData) {
    return this.classesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classesService.delete(id);
  }

  @Post(':id/enrollments')
  enroll(@Param('id') classId: string, @Body('studentId') studentId: string) {
    return this.classesService.enroll(classId, studentId);
  }

  @Delete(':id/enrollments/:studentId')
  unenroll(@Param('id') classId: string, @Param('studentId') studentId: string) {
    return this.classesService.unenroll(classId, studentId);
  }
}
