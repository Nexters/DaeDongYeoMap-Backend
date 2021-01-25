import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseResolver } from "./course.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "./entities/course.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
