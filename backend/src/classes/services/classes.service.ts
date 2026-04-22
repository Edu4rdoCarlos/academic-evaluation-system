import { Inject, Injectable } from '@nestjs/common';
import {
  IClassRepository,
  CLASS_REPOSITORY,
  CreateClassData,
  UpdateClassData,
} from '../repositories/class.repository.interface';

@Injectable()
export class ClassesService {
  constructor(
    @Inject(CLASS_REPOSITORY)
    private readonly classRepository: IClassRepository,
  ) {}

  listAll() {
    return this.classRepository.findAll();
  }

  findById(id: string) {
    return this.classRepository.findById(id);
  }

  findWithStudents(id: string) {
    return this.classRepository.findWithStudents(id);
  }

  create(data: CreateClassData) {
    return this.classRepository.create(data);
  }

  update(id: string, data: UpdateClassData) {
    return this.classRepository.update(id, data);
  }

  delete(id: string) {
    return this.classRepository.delete(id);
  }

  enroll(classId: string, studentId: string) {
    return this.classRepository.enroll(classId, studentId);
  }

  unenroll(classId: string, studentId: string) {
    return this.classRepository.unenroll(classId, studentId);
  }
}
