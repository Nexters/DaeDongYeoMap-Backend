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
exports.StickerSchema = exports.Sticker = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const spot_entity_1 = require("../../spot/entities/spot.entity");
let Sticker = class Sticker {
};
__decorate([
    graphql_1.Field(() => String, { description: "Sticker id" }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Sticker.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => String, {
        description: "Sticker category로 스티커 이름정도 주면 적당할 듯",
    }),
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Sticker.prototype, "sticker_category", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { description: "Sticker가 코스 생성에 사용여부" }),
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Sticker.prototype, "is_used", void 0);
__decorate([
    graphql_1.Field(() => spot_entity_1.Spot, {
        description: "스티커가 붙여진 Spot id 또는 Spot 객체값",
    }),
    mongoose_1.Prop({ type: mongoose.Types.ObjectId, ref: "Spot" }),
    __metadata("design:type", Object)
], Sticker.prototype, "spot", void 0);
Sticker = __decorate([
    graphql_1.ObjectType({
        description: "'이모지 스티커'로 코스 생성에 기본적으로 사용되는 단위입니다.",
    }),
    mongoose_1.Schema({ timestamps: true })
], Sticker);
exports.Sticker = Sticker;
exports.StickerSchema = mongoose_1.SchemaFactory.createForClass(Sticker);
//# sourceMappingURL=sticker.entity.js.map