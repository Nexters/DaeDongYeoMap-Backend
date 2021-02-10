"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceModule = void 0;
const mongoStore = require("cache-manager-mongodb");
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const search_service_1 = require("./kakaoMapSearch/search.service");
const place_resolver_1 = require("./place.resolver");
let PlaceModule = class PlaceModule {
};
PlaceModule = __decorate([
    common_1.Module({
        imports: [
            common_1.CacheModule.registerAsync({
                imports: [config_module_1.AppConfigModule],
                useFactory: async (cfs) => {
                    console.log(await cfs.getCacheDB());
                    return {
                        store: mongoStore,
                        uri: await cfs.getCacheDB(),
                        options: {
                            collection: "cacheManager",
                            compression: false,
                            poolSize: 5,
                        },
                        ttl: 300,
                    };
                },
                inject: [config_service_1.AppConfigService],
            }),
        ],
        providers: [search_service_1.SearchService, place_resolver_1.PlaceResolver],
        exports: [search_service_1.SearchService],
    })
], PlaceModule);
exports.PlaceModule = PlaceModule;
//# sourceMappingURL=place.module.js.map