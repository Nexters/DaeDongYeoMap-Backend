import { Module, CacheModule } from "@nestjs/common";
import * as cacheManager from "cache-manager";
import * as mongoStore from "cache-manager-mongodb";
import { ConfigService } from "src/config/config.service";

import { ConfigModule } from "../config/config.module";
import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

const cacheConfig = {
  imports: [ConfigModule],
  useFactory: (cfs: ConfigService) => ({
    store: mongoStore,
    uri: `mongodb://${cfs.get("MONGO_USER")}:${cfs.get("MONGO_PWD")}@${cfs.get(
      "MONGO_IP"
    )}:${cfs.get("MONGO_PORT")}/${cfs.get("MONGO_CACHE_NAME")}`,
    options: {
      collection: "cacheManager",
      compression: false,
      poolSize: 5,
    },
    ttl: 300,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule, CacheModule.registerAsync(cacheConfig)],

  providers: [SearchService, PlaceResolver],
})
export class PlaceModule {}
