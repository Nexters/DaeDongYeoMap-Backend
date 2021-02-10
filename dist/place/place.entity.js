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
exports.Place = void 0;
const graphql_1 = require("@nestjs/graphql");
let Place = class Place {
};
__decorate([
    graphql_1.Field(() => String, { description: "kakao place id" }),
    __metadata("design:type", String)
], Place.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Place.prototype, "place_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "category_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "category_group_code", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "category_group_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "phone", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "address_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "road_address_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "place_url", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "distance", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "x", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "y", void 0);
Place = __decorate([
    graphql_1.ObjectType({
        description: "카카오 지도 api로 부터 받은 위치 정보로 TTL 300 캐싱됩니다.",
    })
], Place);
exports.Place = Place;
//# sourceMappingURL=place.entity.js.map