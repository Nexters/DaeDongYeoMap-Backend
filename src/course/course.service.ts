import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Course, CourseDocument } from "../course/entities/course.entity";
import { CreateCourseInput } from "../course/dto/create-course.input";
import { CourseImageService } from "../course/courseImage.service";
import { StickerService } from "../sticker/sticker.service";
import { Sticker } from "../sticker/entities/sticker.entity";
import { CreateCourseImageInput } from "./dto/create-course-image.input";

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
        throw new HttpException(
          `cannot save a course cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
  async findOne(id: String): Promise<Course> {
    return this.courseModel
      .findById(id)
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot find a course cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel
      .find()
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot find courses cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async getCourseStaticUrl(
    course: Course,
    createCourseImageInput: CreateCourseImageInput
  ): Promise<String> {
    const stickers: Types.ObjectId[] =
      course.stickers[0] instanceof Sticker
        ? (course.stickers as Sticker[]).map((s: Sticker) => s._id)
        : (course.stickers as Types.ObjectId[]);
    return await this.courseImageService.generate(
      stickers,
      createCourseImageInput
    );
  }

  async populateStickers(courseId: Types.ObjectId): Promise<Sticker[]> {
    return this.courseModel
      .aggregate([
        {
          $match: { _id: courseId },
        },
        {
          $lookup: {
            from: "stickers",
            localField: "stickers",
            foreignField: "_id",
            as: "stickers",
          },
        },
      ])
      .then((response) => response[0].stickers)
      .catch((error) => {
        throw new HttpException(
          `cannot populate a sticker cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
