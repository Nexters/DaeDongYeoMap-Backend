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
exports.CreateSpotInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateSpotInput = class CreateSpotInput {
};
__decorate([
    graphql_1.Field(() => String, { description: "카카오 Place id", nullable: false }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "place_id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "place_name", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateSpotInput.prototype, "x", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateSpotInput.prototype, "y", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "category_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "category_group_code", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "category_group_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "phone", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "address_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "road_address_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "place_url", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateSpotInput.prototype, "distance", void 0);
CreateSpotInput = __decorate([
    graphql_1.InputType({ description: "스팟 생성" })
], CreateSpotInput);
exports.CreateSpotInput = CreateSpotInput;
//# sourceMappingURL=create-spot.input.js.map