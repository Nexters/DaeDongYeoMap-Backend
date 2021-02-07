import * as mongoStore from "cache-manager-mongodb";

import { Module, CacheModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

const cacheConfig = {
  useFactory: (cfs: ConfigService) => ({
    store: mongoStore,
    uri: getCacheDB(cfs),
    options: {
      collection: "cacheManager",
      compression: false,
      poolSize: 5,
    },
    ttl: 300,
  }),
  inject: [ConfigService],
};

function getCacheDB(cfs: ConfigService): string {
  if (cfs.get("NODE_ENV") === "dev") {
    return `mongodb://localhost:27017/nodeCacheDb`;
  }
  return `mongodb://${cfs.get("MONGO_USER")}:${cfs.get("MONGO_PWD")}@${cfs.get(
    "MONGO_IP"
  )}:${cfs.get("MONGO_PORT")}/${cfs.get("MONGO_CACHE_NAME")}`;
}

@Module({
  imports: [CacheModule.register(cacheConfig)],
  providers: [SearchService, PlaceResolver],
  exports: [SearchService],
})
export class PlaceModule {}
