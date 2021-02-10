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
exports.CourseSchema = exports.Course = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const spot_entity_1 = require("../../spot/entities/spot.entity");
let Course = class Course {
};
__decorate([
    graphql_1.Field(() => String, { description: "Course id" }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Course.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => [String], {
        description: "list of sticker ids(순서 중요)",
    }),
    mongoose_1.Prop({ type: [mongoose.Types.ObjectId], ref: "Sticker" }),
    __metadata("design:type", Array)
], Course.prototype, "stickers", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => Boolean, {
        description: "list of sticker ids(순서 중요)",
    }),
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "is_share", void 0);
__decorate([
    graphql_1.Field(() => String, { description: "course의 image url", defaultValue: "" }),
    __metadata("design:type", String)
], Course.prototype, "courseImage", void 0);
Course = __decorate([
    graphql_1.ObjectType({
        description: "스티커(스팟)을 순서대로 저장하고 있는 데이터 코스 정보",
    }),
    mongoose_1.Schema({ timestamps: true })
], Course);
exports.Course = Course;
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
//# sourceMappingURL=course.entity.js.map