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
exports.CreateCourseInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateCourseInput = class CreateCourseInput {
};
__decorate([
    graphql_1.Field(() => [String], {
        description: "list of sticker ids(순서 중요)",
    }),
    __metadata("design:type", Array)
], CreateCourseInput.prototype, "stickers", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateCourseInput.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], CreateCourseInput.prototype, "is_share", void 0);
CreateCourseInput = __decorate([
    graphql_1.InputType()
], CreateCourseInput);
exports.CreateCourseInput = CreateCourseInput;
//# sourceMappingURL=create-course.input.js.map