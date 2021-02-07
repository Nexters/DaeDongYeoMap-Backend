import * as mongoStore from "cache-manager-mongodb";
import { Module, CacheModule } from "@nestjs/common";

import { AppConfigModule } from "../config/config.module";
import { AppConfigService } from "../config/config.service";
import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [
    CacheModule.register({
      imports: [AppConfigModule],
      useFactory: (cfs: AppConfigService) => ({
        store: mongoStore,
        uri: cfs.getCacheDB(),
        options: {
          collection: "cacheManager",
          compression: false,
          poolSize: 5,
        },
        ttl: 300,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [SearchService, PlaceResolver],
  exports: [SearchService],
})
export class PlaceModule {}
