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
exports.PlaceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const place_entity_1 = require("./place.entity");
const search_service_1 = require("./kakaoMapSearch/search.service");
const search_dto_1 = require("./kakaoMapSearch/search.dto");
let PlaceResolver = class PlaceResolver {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async getPlacesByKeyword(filters) {
        const places = await this.searchService.searchByKeyword(filters);
        places.forEach(async (place) => {
            const cachedPlace = await this.searchService.getPlaceFromCacheById(place.id);
            cachedPlace || this.searchService.setPlaceFromCacheById(place.id, place);
        });
        return places;
    }
    async getPlaceFromCache(place_id) {
        const cachedPlace = await this.searchService.getPlaceFromCacheById(place_id);
        if (cachedPlace === undefined) {
            return new common_1.HttpException(`There is no cached place with ${place_id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return cachedPlace;
    }
};
__decorate([
    graphql_1.Query(() => [place_entity_1.Place], {
        description: "키워드로 위치 정보를 확인합니다. \n내부적으로 카카오 API를 요청합니다.",
    }),
    __param(0, graphql_1.Args("filters")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.KeywordSearchDto]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "getPlacesByKeyword", null);
__decorate([
    graphql_1.Query(() => place_entity_1.Place),
    __param(0, graphql_1.Args("place_id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "getPlaceFromCache", null);
PlaceResolver = __decorate([
    graphql_1.Resolver(() => place_entity_1.Place),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], PlaceResolver);
exports.PlaceResolver = PlaceResolver;
//# sourceMappingURL=place.resolver.js.map