import { Inject, Injectable } from '@nestjs/common';
import {
  IStudentRepository,
  STUDENT_REPOSITORY,
  CreateStudentData,
  UpdateStudentData,
} from '../repositories/student.repository.interface';
import { Student } from '../models/student.model';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  listAll(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  findById(id: string): Promise<Student | null> {
    return this.studentRepository.findById(id);
  }

  create(data: CreateStudentData): Promise<Student> {
    return this.studentRepository.create(data);
  }

  update(id: string, data: UpdateStudentData): Promise<Student> {
    return this.studentRepository.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.studentRepository.delete(id);
  }
}
