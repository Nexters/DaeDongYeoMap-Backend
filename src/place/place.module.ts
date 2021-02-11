import { Module } from "@nestjs/common";

import { AppConfigModule } from "../config/config.module";
import { AppConfigService } from "../config/config.service";
import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [],
  providers: [SearchService, PlaceResolver],
  exports: [SearchService],
})
export class PlaceModule {}
