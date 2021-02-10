"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const place_module_1 = require("./place/place.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const spot_module_1 = require("./spot/spot.module");
const user_module_1 = require("./user/user.module");
const course_module_1 = require("./course/course.module");
const sticker_module_1 = require("./sticker/sticker.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_module_1.AppConfigModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
                debug: false,
                playground: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.AppConfigModule],
                useFactory: async (cfs) => {
                    console.log(await cfs.getDB());
                    return {
                        uri: await cfs.getDB(),
                    };
                },
                inject: [config_service_1.AppConfigService],
            }),
            place_module_1.PlaceModule,
            spot_module_1.SpotModule,
            sticker_module_1.StickerModule,
            course_module_1.CourseModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map