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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("cache-manager");
const config_1 = require("@nestjs/config");
const search_dto_1 = require("../../place/kakaoMapSearch/search.dto");
let SearchService = class SearchService {
    constructor(cache, configService) {
        this.cache = cache;
        this.configService = configService;
    }
    async searchByKeyword(keywordSearchDto) {
        const baseUrl = this.configService.get("app.KAKAO_DEV_HOST");
        return axios_1.default.get(baseUrl, {
            headers: {
                Authorization: `KakaoAK ${this.configService.get("app.KAKAO_DEV_REST_API_KEY")}`,
            },
            params: Object.assign({}, keywordSearchDto),
        })
            .then((response) => response.data.documents)
            .catch((err) => {
            if (err.response.status == 400) {
                console.error(err.response);
                throw new common_1.HttpException("no matched place", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.error(err.response);
                throw new common_1.HttpException("kakao api server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async setPlaceFromCacheById(key, value) {
        this.cache
            .set(key, value, { ttl: 300 })
            .then()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException("set place cache error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getPlaceFromCacheById(id) {
        return this.cache
            .get(id)
            .then()
            .catch((error) => {
            console.error(error);
            throw new common_1.HttpException(`cannot get place from cache cause of ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getIdenticalPlace(createSpotInput) {
        return this.searchByKeyword({
            query: createSpotInput.place_name,
            x: createSpotInput.x,
            y: createSpotInput.y,
            radius: 1,
            sort: search_dto_1.SortType.distance,
        })
            .then((places) => (places.length >= 1 ? places[0] : null))
            .catch((error) => {
            console.error(error);
            throw new common_1.HttpException(`cannot get identical place cause of ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
SearchService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, config_1.ConfigService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map