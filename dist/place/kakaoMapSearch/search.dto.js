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
exports.KeywordSearchDto = exports.SortType = void 0;
const graphql_1 = require("@nestjs/graphql");
var SortType;
(function (SortType) {
    SortType["distance"] = "distance";
    SortType["accuracy"] = "accuracy";
})(SortType = exports.SortType || (exports.SortType = {}));
graphql_1.registerEnumType(SortType, {
    name: "SortType",
});
let KeywordSearchDto = class KeywordSearchDto {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], KeywordSearchDto.prototype, "query", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], KeywordSearchDto.prototype, "category_group_code", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], KeywordSearchDto.prototype, "x", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], KeywordSearchDto.prototype, "y", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], KeywordSearchDto.prototype, "radius", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], KeywordSearchDto.prototype, "rect", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], KeywordSearchDto.prototype, "page", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], KeywordSearchDto.prototype, "size", void 0);
__decorate([
    graphql_1.Field((type) => SortType, { nullable: true }),
    __metadata("design:type", String)
], KeywordSearchDto.prototype, "sort", void 0);
KeywordSearchDto = __decorate([
    graphql_1.InputType({
        description: "SortType은 정확도(accuracy)가 기본이며, 거리순(distance) 정렬을 원할 경우 x,y는 필수 입니다.",
    })
], KeywordSearchDto);
exports.KeywordSearchDto = KeywordSearchDto;
//# sourceMappingURL=search.dto.js.map