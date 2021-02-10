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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
const spot_service_1 = require("../spot/spot.service");
const spot_entity_1 = require("../spot/entities/spot.entity");
const sticker_service_1 = require("./sticker.service");
const sticker_entity_1 = require("./entities/sticker.entity");
const sticker_input_1 = require("./dto/sticker.input");
let StickerResolver = class StickerResolver {
    constructor(stickerService, spotService) {
        this.stickerService = stickerService;
        this.spotService = spotService;
    }
    async createSticker(createStickerInput) {
        return await this.stickerService.create(createStickerInput);
    }
    async updateSticker(updateStickerInput) {
        return await this.stickerService.update(updateStickerInput);
    }
    findAll() {
        return this.stickerService.findAll();
    }
    findOne(id) {
        return this.stickerService.findOne(id);
    }
    async spot(sticker, populate) {
        if (populate) {
            return await this.spotService.findOne(sticker.spot);
        }
        return sticker.spot;
    }
};
__decorate([
    graphql_1.Mutation(() => sticker_entity_1.Sticker),
    __param(0, graphql_1.Args("createStickerInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sticker_input_1.CreateStickerInput]),
    __metadata("design:returntype", Promise)
], StickerResolver.prototype, "createSticker", null);
__decorate([
    graphql_1.Mutation(() => sticker_entity_1.Sticker),
    __param(0, graphql_1.Args("updateStickerInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sticker_input_1.UpdateStickerInput]),
    __metadata("design:returntype", Promise)
], StickerResolver.prototype, "updateSticker", null);
__decorate([
    graphql_1.Query(() => [sticker_entity_1.Sticker], { name: "stickers" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StickerResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => sticker_entity_1.Sticker, { name: "sticker" }),
    __param(0, graphql_1.Args("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], StickerResolver.prototype, "findOne", null);
__decorate([
    graphql_1.ResolveField(() => spot_entity_1.Spot, {
        description: "populate: true 경우 spot_id를 spot 값으로 치환하여 반환합니다.",
    }),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args("populate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Promise)
], StickerResolver.prototype, "spot", null);
StickerResolver = __decorate([
    graphql_1.Resolver(() => sticker_entity_1.Sticker),
    __metadata("design:paramtypes", [sticker_service_1.StickerService,
        spot_service_1.SpotService])
], StickerResolver);
exports.StickerResolver = StickerResolver;
//# sourceMappingURL=sticker.resolver.js.map