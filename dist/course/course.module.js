"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const courseImage_service_1 = require("./courseImage.service");
const course_resolver_1 = require("./course.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const place_module_1 = require("../place/place.module");
const course_entity_1 = require("./entities/course.entity");
const sticker_entity_1 = require("../sticker/entities/sticker.entity");
const sticker_service_1 = require("../sticker/sticker.service");
const spot_service_1 = require("../spot/spot.service");
const spot_entity_1 = require("../spot/entities/spot.entity");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    common_1.Module({
        imports: [
            place_module_1.PlaceModule,
            mongoose_1.MongooseModule.forFeature([{ name: course_entity_1.Course.name, schema: course_entity_1.CourseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: sticker_entity_1.Sticker.name, schema: sticker_entity_1.StickerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: spot_entity_1.Spot.name, schema: spot_entity_1.SpotSchema }]),
        ],
        providers: [
            course_resolver_1.CourseResolver,
            course_service_1.CourseService,
            courseImage_service_1.CourseImageService,
            sticker_service_1.StickerService,
            spot_service_1.SpotService,
        ],
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map