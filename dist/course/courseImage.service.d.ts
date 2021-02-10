import { ConfigService } from "@nestjs/config";
import { Model, Types } from "mongoose";
import { CourseDocument } from "src/course/entities/course.entity";
import { StickerService } from "src/sticker/sticker.service";
import { CreateCourseImageInput } from "./dto/create-course-image.input";
export declare class CourseImageService {
    private courseModel;
    private configService;
    private readonly stickerService;
    mapboxToken: string;
    mapboxImageUrl: string;
    mapboxDirectionUrl: string;
    sweetImgUrl: string;
    constructor(courseModel: Model<CourseDocument>, configService: ConfigService, stickerService: StickerService);
    generate(stickers: Types.ObjectId[], createCourseImageInput: CreateCourseImageInput): Promise<String>;
    genStickerPath(coords: [Number, Number][]): string;
    genPolyline(coords: [Number, Number][]): Promise<String>;
    getPolyline(coords: [Number, Number][]): Promise<String>;
}
