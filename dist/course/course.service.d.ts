import { Model } from "mongoose";
import { Course, CourseDocument } from "../course/entities/course.entity";
import { CreateCourseInput } from "../course/dto/create-course.input";
import { CourseImageService } from "../course/courseImage.service";
import { StickerService } from "../sticker/sticker.service";
import { CreateCourseImageInput } from "./dto/create-course-image.input";
export declare class CourseService {
    private courseModel;
    private readonly courseImageService;
    private readonly stickerService;
    constructor(courseModel: Model<CourseDocument>, courseImageService: CourseImageService, stickerService: StickerService);
    create(createCourseInput: CreateCourseInput): Promise<Course>;
    findOne(id: String): Promise<Course>;
    findAll(): Promise<Course[]>;
    getCourseStaticUrl(course: Course, createCourseImageInput: CreateCourseImageInput): Promise<String>;
}
