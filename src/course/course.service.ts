import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Course, CourseDocument } from "src/course/entities/course.entity";
import { CreateCourseInput } from "src/course/dto/create-course.input";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>
  ) {}

  async create(createCourseInput: CreateCourseInput): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseInput);
    return createdCourse
      .save()
      .then()
      .catch((error) => {
        console.error(error);
        throw new HttpException(
          `cannot save a course cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }

  //   async findAll(): Promise<Course> {
  //     return `This action returns all course`;
  //   }

  //   async findOne(id: number): Promise<Course> {
  //     return `This action returns a #${id} course`;
  //   }

  //   async update(
  //     id: number,
  //     updateCourseInput: UpdateCourseInput
  //   ): Promise<Course> {
  //     return `This action updates a #${id} course`;
  //   }

  //   async remove(id: number): Promise<Course> {
  //     return `This action removes a #${id} course`;
  //   }
}
