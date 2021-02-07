import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Course, CourseDocument } from "src/course/entities/course.entity";
import { CreateCourseInput } from "src/course/dto/create-course.input";
import { CourseImageService } from "../course/courseImage.service";
import { StickerService } from "src/sticker/sticker.service";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private readonly courseImageService: CourseImageService,
    private readonly stickerService: StickerService
  ) {}

  async create(createCourseInput: CreateCourseInput): Promise<Course> {
    createCourseInput.stickers.forEach((sticker) => {
      this.stickerService.update({ _id: sticker, is_used: true });
    });
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
  async findOne(_id: Types.ObjectId): Promise<Course> {
    return this.courseModel
      .findOne()
      .exec()
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          `cannot find a course cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async getCourseStaticUrl(_id: Types.ObjectId): Promise<String> {
    const course: Course = await this.findOne(_id);
    const url = this.courseImageService.generate(course.stickers);
    return url;
  }
}
