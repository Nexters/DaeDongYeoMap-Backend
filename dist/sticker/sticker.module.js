"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const place_module_1 = require("../place/place.module");
const sticker_service_1 = require("./sticker.service");
const sticker_resolver_1 = require("./sticker.resolver");
const sticker_entity_1 = require("../sticker/entities/sticker.entity");
const spot_entity_1 = require("../spot/entities/spot.entity");
const spot_service_1 = require("../spot/spot.service");
let StickerModule = class StickerModule {
};
StickerModule = __decorate([
    common_1.Module({
        imports: [
            place_module_1.PlaceModule,
            mongoose_1.MongooseModule.forFeature([{ name: sticker_entity_1.Sticker.name, schema: sticker_entity_1.StickerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: spot_entity_1.Spot.name, schema: spot_entity_1.SpotSchema }]),
        ],
        providers: [sticker_resolver_1.StickerResolver, sticker_service_1.StickerService, spot_service_1.SpotService],
    })
], StickerModule);
exports.StickerModule = StickerModule;
//# sourceMappingURL=sticker.module.js.map