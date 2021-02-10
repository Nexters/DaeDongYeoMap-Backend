import { CourseService } from "./course.service";
import { Course } from "./entities/course.entity";
import { CreateCourseInput } from "./dto/create-course.input";
import { CourseInput } from "./dto/course.input";
export declare class CourseResolver {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseInput: CreateCourseInput): Promise<Course>;
    findAll(): Promise<Course[]>;
    findOne(courseInput: CourseInput): Promise<Course>;
}
