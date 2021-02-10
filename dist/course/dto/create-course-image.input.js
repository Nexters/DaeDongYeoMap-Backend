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
exports.CreateCourseImageInput = exports.ImageThemeType = void 0;
const graphql_1 = require("@nestjs/graphql");
var ImageThemeType;
(function (ImageThemeType) {
    ImageThemeType["dark"] = "dark-v10";
    ImageThemeType["light"] = "light-v10";
    ImageThemeType["street"] = "streets-v11";
})(ImageThemeType = exports.ImageThemeType || (exports.ImageThemeType = {}));
graphql_1.registerEnumType(ImageThemeType, {
    name: "ImageThemeType",
});
let CreateCourseImageInput = class CreateCourseImageInput {
};
__decorate([
    graphql_1.Field(() => ImageThemeType, {
        description: "이미지 테마",
        nullable: true,
        defaultValue: ImageThemeType.street,
    }),
    __metadata("design:type", String)
], CreateCourseImageInput.prototype, "theme", void 0);
__decorate([
    graphql_1.Field(() => Number, {
        description: "이미지 가로 사이즈",
        nullable: true,
        defaultValue: 700,
    }),
    __metadata("design:type", Number)
], CreateCourseImageInput.prototype, "width", void 0);
__decorate([
    graphql_1.Field(() => Number, {
        description: "이미지 세로 사이즈",
        nullable: true,
        defaultValue: 700,
    }),
    __metadata("design:type", Number)
], CreateCourseImageInput.prototype, "height", void 0);
CreateCourseImageInput = __decorate([
    graphql_1.InputType()
], CreateCourseImageInput);
exports.CreateCourseImageInput = CreateCourseImageInput;
//# sourceMappingURL=create-course-image.input.js.map