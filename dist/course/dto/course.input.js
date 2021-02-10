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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_course_image_input_1 = require("../dto/create-course-image.input");
let CourseInput = class CourseInput {
};
__decorate([
    graphql_1.Field(() => String, {
        description: "코스 id",
    }),
    __metadata("design:type", String)
], CourseInput.prototype, "courseId", void 0);
__decorate([
    graphql_1.Field(() => create_course_image_input_1.CreateCourseImageInput, {
        nullable: true,
        description: "course input을 채우면, 이미지 url을 생성하여 전달합니다.",
    }),
    __metadata("design:type", create_course_image_input_1.CreateCourseImageInput)
], CourseInput.prototype, "courseImageInput", void 0);
CourseInput = __decorate([
    graphql_1.InputType()
], CourseInput);
exports.CourseInput = CourseInput;
//# sourceMappingURL=course.input.js.map