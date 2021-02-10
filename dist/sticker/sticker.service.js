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
exports.StickerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const sticker_entity_1 = require("./entities/sticker.entity");
const spot_service_1 = require("../spot/spot.service");
let StickerService = class StickerService {
    constructor(stickerModel, spotService) {
        this.stickerModel = stickerModel;
        this.spotService = spotService;
    }
    async create(createStickerInput) {
        const stickerDocument = new this.stickerModel(createStickerInput);
        let spot = await this.spotService.findOneByPlaceId(createStickerInput.place_id);
        if (spot === null) {
            spot = await this.spotService.document(createStickerInput);
            spot.stickers.push(stickerDocument._id);
            await this.spotService.save(spot);
        }
        else {
            spot = await this.spotService.appendSticker(spot._id, stickerDocument._id);
        }
        stickerDocument.spot = spot._id;
        return stickerDocument.save().catch((error) => {
            console.error(error);
            throw new common_1.HttpException(`cannot create a sticker cause of ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async update(updateStickerInput) {
        return this.stickerModel
            .findOneAndUpdate({ _id: updateStickerInput._id }, { $set: updateStickerInput }, { new: true })
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot update a sticker cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findOne(_id) {
        return this.stickerModel
            .findOne()
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot find a sticker cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll(ids = null) {
        const filters = ids ? { _id: { $in: ids } } : {};
        return this.stickerModel
            .find(filters)
            .exec()
            .catch((err) => {
            console.error(err);
            throw new common_1.HttpException(`cannot find stickers cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getAllSpots(stickerIds) {
        const stickers = await this.findAll(stickerIds);
        const spotIds = stickers.map((s) => s.spot);
        return this.spotService.findAll(spotIds);
    }
};
StickerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(sticker_entity_1.Sticker.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        spot_service_1.SpotService])
], StickerService);
exports.StickerService = StickerService;
//# sourceMappingURL=sticker.service.js.map