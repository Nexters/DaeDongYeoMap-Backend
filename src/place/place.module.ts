import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";

import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [ConfigModule],
  providers: [SearchService, PlaceResolver],
})
export class PlaceModule {}
