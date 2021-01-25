import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';

@Module({
  providers: [CourseResolver, CourseService]
})
export class CourseModule {}
