import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { StudentRepository } from './repositories/student.repository';
import { STUDENT_REPOSITORY } from './repositories/student.repository.interface';

@Module({
  controllers: [StudentsController],
  providers: [
    StudentsService,
    { provide: STUDENT_REPOSITORY, useClass: StudentRepository },
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
