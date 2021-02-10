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
exports.CourseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const course_service_1 = require("./course.service");
const course_entity_1 = require("./entities/course.entity");
const create_course_input_1 = require("./dto/create-course.input");
const course_input_1 = require("./dto/course.input");
let CourseResolver = class CourseResolver {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(createCourseInput) {
        return await this.courseService.create(createCourseInput);
    }
    async findAll() {
        return await this.courseService.findAll();
    }
    async findOne(courseInput) {
        const course = await this.courseService.findOne(courseInput.courseId);
        if (courseInput.courseImageInput) {
            course.courseImage = await this.courseService.getCourseStaticUrl(course, courseInput.courseImageInput);
        }
        return course;
    }
};
__decorate([
    graphql_1.Mutation(() => course_entity_1.Course, {
        description: "Sticker를 사용하여 코스를 생성합니다. 이때 코스의 순서는 전달된 스티커들의 순서로 처리됩니다.",
    }),
    __param(0, graphql_1.Args("createCourseInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_input_1.CreateCourseInput]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "createCourse", null);
__decorate([
    graphql_1.Query(() => [course_entity_1.Course], { name: "courses" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => course_entity_1.Course, {
        name: "course",
        description: "a Course",
    }),
    __param(0, graphql_1.Args("courseInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_1.CourseInput]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "findOne", null);
CourseResolver = __decorate([
    graphql_1.Resolver(() => course_entity_1.Course),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseResolver);
exports.CourseResolver = CourseResolver;
//# sourceMappingURL=course.resolver.js.map