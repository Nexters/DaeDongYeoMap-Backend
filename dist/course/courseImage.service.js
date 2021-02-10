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
exports.CourseImageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const urlencode = require("urlencode");
const course_entity_1 = require("./entities/course.entity");
const sticker_service_1 = require("../sticker/sticker.service");
let CourseImageService = class CourseImageService {
    constructor(courseModel, configService, stickerService) {
        this.courseModel = courseModel;
        this.configService = configService;
        this.stickerService = stickerService;
        const mapboxHost = this.configService.get("app.MAPBOX_API_HOST");
        const mapboxImagePath = this.configService.get("app.MAPBOX_STATIC_IMAGE_PATH");
        const mapboxDirPath = this.configService.get("app.MAPBOX_DIRECTION_PATH");
        this.mapboxToken = this.configService.get("app.MAPBOX_TOKEN");
        this.mapboxImageUrl = `${mapboxHost}/${mapboxImagePath}`;
        this.mapboxDirectionUrl = `${mapboxHost}/${mapboxDirPath}`;
        this.sweetImgUrl = urlencode(this.configService.get("app.IMG_SWEET_URL"));
    }
    async generate(stickers, createCourseImageInput) {
        const { theme, width, height } = createCourseImageInput;
        const mapSize = `${width}x${height}`;
        const autoScale = "auto";
        const spots = await this.stickerService.getAllSpots(stickers);
        const coords = spots.map((s) => s.location["coordinates"]);
        const stickerPath = this.genStickerPath(coords);
        console.log(spots);
        const path = await this.genPolyline(coords);
        const imageUrl = `${this.mapboxImageUrl}/${theme}/static/${path},${stickerPath}/${autoScale}/${mapSize}?access_token=${this.mapboxToken}`;
        console.log(imageUrl);
        return imageUrl;
    }
    genStickerPath(coords) {
        const prefix = `url-${this.sweetImgUrl}`;
        const url = coords.map((coord) => `${prefix}(${coord})`).join(",");
        return url;
    }
    async genPolyline(coords) {
        const polyline = await this.getPolyline(coords);
        const path = `path-4%2Bff512f(${urlencode(polyline)})`;
        return path;
    }
    async getPolyline(coords) {
        const coordsPath = urlencode(coords.map((coord, _) => coord.join(",")).join(";"));
        const pathUrl = `${this.mapboxDirectionUrl}/${coordsPath}`;
        const params = {
            alternatives: true,
            geometries: "polyline",
            steps: true,
            access_token: this.mapboxToken,
        };
        return axios_1.default.get(pathUrl, {
            params,
        })
            .then((response) => {
            const routes = response.data.routes;
            if (routes.length < 1) {
                throw new Error("There are no routes to generate path");
            }
            return routes[0].geometry;
        })
            .catch((err) => {
            console.error(err.response);
            throw new common_1.HttpException(`cannot get path cause of ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
CourseImageService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(course_entity_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        sticker_service_1.StickerService])
], CourseImageService);
exports.CourseImageService = CourseImageService;
//# sourceMappingURL=courseImage.service.js.map