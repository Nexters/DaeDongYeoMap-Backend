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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get(key) {
        return this.configService.get(`app.${key}`);
    }
    getAll() {
        return this.configService.get("app");
    }
    async getDB() {
        return this.get("NODE_ENV") === "dev"
            ? `mongodb://localhost:27017/mongo`
            : `mongodb://${this.configService.get("app.MONGO_USER")}:${this.configService.get("app.MONGO_PWD")}@${this.configService.get("app.MONGO_IP")}:${this.configService.get("app.MONGO_PORT")}/${this.configService.get("app.MONGO_DB_NAME")}`;
    }
    async getCacheDB() {
        return this.get("NODE_ENV") === "dev"
            ? `mongodb://localhost:27017/nodeCacheDb`
            : `mongodb://${this.configService.get("app.MONGO_USER")}:${this.configService.get("app.MONGO_PWD")}@${this.configService.get("app.MONGO_IP")}:${this.configService.get("app.MONGO_PORT")}/${this.configService.get("app.MONGO_CACHE_NAME")}`;
    }
};
AppConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
exports.AppConfigService = AppConfigService;
//# sourceMappingURL=config.service.js.map