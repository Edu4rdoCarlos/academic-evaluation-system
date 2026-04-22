import { Module } from '@nestjs/common';
import { ClassesController } from './controllers/classes.controller';
import { ClassesService } from './services/classes.service';
import { ClassRepository } from './repositories/class.repository';
import { CLASS_REPOSITORY } from './repositories/class.repository.interface';

@Module({
  controllers: [ClassesController],
  providers: [
    ClassesService,
    { provide: CLASS_REPOSITORY, useClass: ClassRepository },
  ],
  exports: [ClassesService],
})
export class ClassesModule {}
