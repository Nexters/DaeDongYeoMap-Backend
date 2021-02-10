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
exports.UpdateStickerInput = exports.CreateStickerInput = exports.StickerInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose = require("mongoose");
const create_spot_input_1 = require("../../spot/dto/create-spot.input");
const spot_entity_1 = require("../../spot/entities/spot.entity");
let StickerInput = class StickerInput {
};
__decorate([
    graphql_1.Field(() => String, {
        description: "Sticker category로 스티커 이름정도 주면 적당할 듯",
    }),
    __metadata("design:type", String)
], StickerInput.prototype, "sticker_category", void 0);
__decorate([
    graphql_1.Field(() => Boolean, {
        description: "Sticker가 코스 생성에 사용여부",
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], StickerInput.prototype, "is_used", void 0);
StickerInput = __decorate([
    graphql_1.InputType()
], StickerInput);
exports.StickerInput = StickerInput;
let CreateStickerInput = class CreateStickerInput extends graphql_1.IntersectionType(create_spot_input_1.CreateSpotInput, StickerInput) {
};
CreateStickerInput = __decorate([
    graphql_1.InputType()
], CreateStickerInput);
exports.CreateStickerInput = CreateStickerInput;
let UpdateStickerInput = class UpdateStickerInput {
};
__decorate([
    graphql_1.Field(() => String, { description: "Sticker id" }),
    __metadata("design:type", mongoose.Types.ObjectId)
], UpdateStickerInput.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => Boolean, {
        description: "Sticker가 코스 생성에 사용여부",
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], UpdateStickerInput.prototype, "is_used", void 0);
UpdateStickerInput = __decorate([
    graphql_1.InputType()
], UpdateStickerInput);
exports.UpdateStickerInput = UpdateStickerInput;
//# sourceMappingURL=sticker.input.js.map