"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const place_module_1 = require("../place/place.module");
const spot_entity_1 = require("../spot/entities/spot.entity");
const spot_service_1 = require("../spot/spot.service");
const spot_resolver_1 = require("../spot/spot.resolver");
let SpotModule = class SpotModule {
};
SpotModule = __decorate([
    common_1.Module({
        imports: [
            place_module_1.PlaceModule,
            mongoose_1.MongooseModule.forFeature([{ name: spot_entity_1.Spot.name, schema: spot_entity_1.SpotSchema }]),
        ],
        providers: [spot_resolver_1.SpotResolver, spot_service_1.SpotService],
    })
], SpotModule);
exports.SpotModule = SpotModule;
//# sourceMappingURL=spot.module.js.map