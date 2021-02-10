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
exports.SpotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const search_service_1 = require("../place/kakaoMapSearch/search.service");
const spot_entity_1 = require("../spot/entities/spot.entity");
let SpotService = class SpotService {
    constructor(spotModel, searchService) {
        this.spotModel = spotModel;
        this.searchService = searchService;
    }
    async document(createSpotInput) {
        const spot = await this.findOneByPlaceId(createSpotInput.place_id);
        let place = await this.searchService.getPlaceFromCacheById(createSpotInput.place_id);
        if (place === undefined) {
            const placeResult = await this.searchService.getIdenticalPlace(createSpotInput);
            if (placeResult === undefined) {
            }
            else {
                place = placeResult;
            }
        }
        const location = { type: "Point", coordinates: [place.x, place.y] };
        const createSpotDto = Object.assign({ place_id: place.id, location }, place);
        return new this.spotModel(createSpotDto);
    }
    async save(spotDocument) {
        return spotDocument.save().catch((error) => {
            console.error(error);
            throw new common_1.HttpException(`cannot save a spot cause of ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async appendSticker(spotId, stickerId) {
        return this.spotModel
            .findOneAndUpdate({ _id: spotId }, { $push: { stickers: stickerId } })
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot append sticker to spot cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findOne(_id) {
        return this.spotModel
            .findOne()
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot find a spot cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findOneByPlaceId(place_id) {
        return this.spotModel.findOne({ place_id }).exec();
    }
    async findAll(ids = null) {
        const filters = ids ? { _id: { $in: ids } } : {};
        return this.spotModel
            .find(filters)
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException("bad request", common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async remove(place_id) {
        return this.spotModel.remove({ place_id }).exec();
    }
    async getByKeyword(keyword) {
        return this.spotModel
            .find({ place_name: new RegExp(keyword) })
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException("There is no spots that matched by keyword.", common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async populateStickers(spot_id) {
        return this.spotModel
            .aggregate([
            {
                $match: { _id: spot_id },
            },
            {
                $lookup: {
                    from: "stickers",
                    localField: "stickers",
                    foreignField: "_id",
                    as: "stickers",
                },
            },
        ])
            .then((response) => response[0].stickers)
            .catch((error) => {
            console.error(error);
            throw new common_1.HttpException(`cannot populate a sticker cause of ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
SpotService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(spot_entity_1.Spot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        search_service_1.SearchService])
], SpotService);
exports.SpotService = SpotService;
//# sourceMappingURL=spot.service.js.map