"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_entity_1 = require("../course/entities/course.entity");
const courseImage_service_1 = require("../course/courseImage.service");
const sticker_service_1 = require("../sticker/sticker.service");
let CourseService = class CourseService {
    constructor(courseModel, courseImageService, stickerService) {
        this.courseModel = courseModel;
        this.courseImageService = courseImageService;
        this.stickerService = stickerService;
    }
    async create(createCourseInput) {
        createCourseInput.stickers.forEach((sticker) => {
            this.stickerService.update({ _id: sticker, is_used: true });
        });
        const createdCourse = new this.courseModel(createCourseInput);
        return createdCourse
            .save()
            .then()
            .catch((error) => {
            console.error(error);
            throw new common_1.HttpException(`cannot save a course cause of ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async findOne(id) {
        return this.courseModel
            .findById(id)
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot find a course cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.courseModel
            .find()
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot find courses cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getCourseStaticUrl(course, createCourseImageInput) {
        return await this.courseImageService.generate(course.stickers, createCourseImageInput);
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(course_entity_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        courseImage_service_1.CourseImageService,
        sticker_service_1.StickerService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map