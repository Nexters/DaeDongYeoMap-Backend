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
exports.SpotSchema = exports.Spot = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const sticker_entity_1 = require("../../sticker/entities/sticker.entity");
let Spot = class Spot {
};
__decorate([
    graphql_1.Field(() => String, { description: "Spot id" }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Spot.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(() => String, { description: "kakao place id" }),
    mongoose_1.Prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Spot.prototype, "place_id", void 0);
__decorate([
    graphql_1.Field(() => [sticker_entity_1.Sticker], { description: "list of sticker ids" }),
    mongoose_1.Prop({ type: [mongoose.Types.ObjectId], ref: "Sticker" }),
    __metadata("design:type", Array)
], Spot.prototype, "stickers", void 0);
__decorate([
    graphql_1.Field(() => String),
    mongoose_1.Prop({ required: true, text: true }),
    __metadata("design:type", String)
], Spot.prototype, "place_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "category_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "category_group_code", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "category_group_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "phone", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "address_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "road_address_name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "place_url", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Spot.prototype, "distance", void 0);
__decorate([
    mongoose_1.Prop({
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            index: "2dsphere",
            default: [0, 0],
        },
    }),
    __metadata("design:type", String)
], Spot.prototype, "location", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Spot.prototype, "x", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Spot.prototype, "y", void 0);
Spot = __decorate([
    graphql_1.ObjectType({
        description: "Emoji를 포함한 유저데이터를 포함하여, mongodb에 저장시킬 장소 데이터",
    }),
    mongoose_1.Schema({ timestamps: true })
], Spot);
exports.Spot = Spot;
exports.SpotSchema = mongoose_1.SchemaFactory.createForClass(Spot);
//# sourceMappingURL=spot.entity.js.map