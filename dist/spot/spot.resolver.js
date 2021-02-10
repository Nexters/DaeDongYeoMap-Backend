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
exports.SpotResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const spot_service_1 = require("../spot/spot.service");
const spot_entity_1 = require("../spot/entities/spot.entity");
const sticker_entity_1 = require("../sticker/entities/sticker.entity");
const delete_spot_dto_1 = require("../spot/dto/delete.spot.dto");
let SpotResolver = class SpotResolver {
    constructor(spotService) {
        this.spotService = spotService;
    }
    async getAllSpots() {
        const result = await this.spotService.findAll();
        return result;
    }
    async removeSpot(id) {
        return await this.spotService.remove(id);
    }
    async getSpotsByKeyword(keyword) {
        return await this.spotService.getByKeyword(keyword);
    }
    async findOne(place_id) {
        const result = await this.spotService.findOneByPlaceId(place_id);
        if (result) {
            throw new common_1.HttpException("There is no spots that matched by kakao id.", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async stickers(spot, populate) {
        if (populate) {
            return await this.spotService.populateStickers(spot._id);
        }
        return spot.stickers;
    }
};
__decorate([
    graphql_1.Query(() => [spot_entity_1.Spot], {
        description: "(For Debugging) mongoDB에 저장된 모든 스팟 반환",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpotResolver.prototype, "getAllSpots", null);
__decorate([
    graphql_1.Mutation(() => delete_spot_dto_1.DeleteSpotDto, {
        description: "(For Debugging) 스팟 하나 삭제",
    }),
    __param(0, graphql_1.Args("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotResolver.prototype, "removeSpot", null);
__decorate([
    graphql_1.Query(() => [spot_entity_1.Spot], { description: "검색 키워드와 매칭되는 스팟들을 반환" }),
    __param(0, graphql_1.Args("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotResolver.prototype, "getSpotsByKeyword", null);
__decorate([
    graphql_1.Query(() => spot_entity_1.Spot, {
        name: "spot",
        description: "(For Debugging) 카카오 place id로 스팟 검색",
    }),
    __param(0, graphql_1.Args("place_id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotResolver.prototype, "findOne", null);
__decorate([
    graphql_1.ResolveField(() => [sticker_entity_1.Sticker], {
        description: "populate: true 경우 sticker값을 치환하여 반환합니다.",
    }),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args("populate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Promise)
], SpotResolver.prototype, "stickers", null);
SpotResolver = __decorate([
    graphql_1.Resolver(() => spot_entity_1.Spot),
    __metadata("design:paramtypes", [spot_service_1.SpotService])
], SpotResolver);
exports.SpotResolver = SpotResolver;
//# sourceMappingURL=spot.resolver.js.map